import { validationResult } from "express-validator";
import { User } from "../models/user.model.js"
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();
 

 

export const googleSignInAction = async (req, res) => {
  const { email, name } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        username: name,
        email: email,
        password: "firebase_auth",
        verified: true,
      });
      await user.save();
    }

    const token = jwt.sign(
  { userId: user._id, email: user.email },  
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
);

    user.token = token;
    await user.save();

    res.status(200).json({
  message: "Google login successful",
  token,
  user: {
    id: user._id,   
    username: user.username,
    email: user.email,
    verified: user.verified,
  },
});


  } catch (error) {
    console.error("Google login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};



export const verifyAccount = async (request,response,next)=>{
  try{
     let {email} = request.body;
     User.updateOne({email},{$set:{verified: true}})
     .then(result=>{
        return response.redirect("https://resumegenius-0w0e.onrender.com");   

     }).catch(err=>{
        return response.status(500).json({error: "Internal Server Error.."});
     });
  }
  catch(err){
    console.log(err);
    return response.status(500).json({error: "Internal Server Error"});
  }
}
 


export const signInAction = async (request, response) => {
    try {
        const {  email, password } = request.body;

        const user = await User.findOne({ email });

        if (!user) {
            return response.status(401).json({ error: "Unauthorized | Email not found" });
        }

        if (!user.verified) {
            return response.status(401).json({ error: "User not verified" });
        }

        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return response.status(401).json({ error: "Unauthorized | Invalid password" });
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        user.password = undefined;  

        return response.status(200).json({
            message: "Sign In Success",
            token,
            user
        });
    } catch (err) {
        console.error(err);
        return response.status(500).json({ error: "Internal Server Error" });
    }
}

 
export const signUpAction = async (request, response, next) => {
    try {
        const error = validationResult(request);
        if (!error.isEmpty())
            return response.status(401).json({ error: "Bad request | Invalid data", errorDetails: error.array() });
        let { password } = request.body;
        let saltKey = bcrypt.genSaltSync(12);
        password = bcrypt.hashSync(password, saltKey);
        request.body.password = password;
        let emailStatus = await sendEmail(request.body.email);
        const result = emailStatus && await User.create(request.body);
        return response.status(201).json({ message: "User created", userDetail: result });
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internal Server Error" });
    }
}
export const verifyEmail = async (req, res) => {
    try {
        const { token } = req.params;

        const user = await User.findOne({ verificationToken: token });
        if (!user) return res.status(400).json({ error: "Invalid token" });

        user.verified = true;
        user.verificationToken = null;
        await user.save();

         
        return res.redirect("http://localhost:3000/sign-in");   
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
 
const sendEmail = (toEmail) => {
    return new Promise((resolve, reject) => {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_ID,
                pass: process.env.GMAIL_PASSWORD
            }
        });

        let mailOptions = {
            from: process.env.GMAIL_ID,
            to: toEmail,
            subject: 'Account Verification',
          html: `<h4>Dear user</h4>
<p>Thank you to visit us</p>
<p><b>Click on below button to verify account</b></p>
<p>
 <form method="post" action="http://localhost:3000/user/verify">
  <input type="hidden" value="${toEmail}" name="email"/>
  <button type="submit" style="background-color:mediumseagreen;width:200px;height:60px;color:white;">Verify Your Account</button>
 </form>
</p>
 
<h6>Thanks</h6>
<b>AI Resume & Card Builder Team</b>`

        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                reject(false);
            } else {
                resolve(true);
            }
        });
    });
}


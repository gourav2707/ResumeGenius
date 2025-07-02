 // server/app.js
 import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import UserRouter from "./routes/user.routes.js";
import resumeRoutes from "./routes/resume.routes.js";
import cors from "cors";
 import helmet from "helmet";

import dotenv from "dotenv";
 
dotenv.config();

const app = express();
  
  app.use(cors( ));

 app.use(helmet());
mongoose.connect(process.env.MONGO_URL)   //"mongodb://localhost:27017/resumedb"
    .then(() => {
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use("/user", UserRouter);
        app.use("/resume", resumeRoutes);
  
        
        app.listen(process.env.PORT, () => {
            console.log("Server Started...At " + process.env.PORT);
        });
}).catch(err=>{
    console.log("Database connection failed..");
})
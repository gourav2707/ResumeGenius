import express from "express";
import { signUpAction, signInAction, verifyAccount ,verifyEmail,googleSignInAction} from "../controllers/user.controller.js";
import { body } from "express-validator";

const router = express.Router();

// http://localhost:3000/user/sign-up
router.post("/sign-up",
    body("username","username is required").notEmpty(),
    body("email","email id is required").notEmpty(),
    body("email","invalid email id").isEmail(),
    signUpAction);
router.post("/sign-in",signInAction);
router.post("/verify",verifyAccount);
router.get("/verify/:token", verifyEmail);
router.post("/google-login", googleSignInAction);
export default router;
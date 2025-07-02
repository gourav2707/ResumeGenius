import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        trim: true
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    token:{
        type: String,
        default: null
    },
    verified:{
        type:Boolean,
        default: false
    }
});

export const User = mongoose.model("user",userSchema);
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: true,
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minLength: 5,
    },
    gender:{
        type: String,
        required: true,
        enum: ["male","female"],
    },
    profilePic:{
        type: String,
        default: ""
    }
},{timestamps:true});//will give createdAt, updatedAt fields

const User = mongoose.model("User", userSchema);
export default User;

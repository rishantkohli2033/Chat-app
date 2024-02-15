import User from "../models/user.model.js";
import bcrypt from "bcryptjs";


export const signupUser = async (req,res)=>{
    try {
        console.log(req.body)
        const {fullName, username, password, confirmPassword, gender} = req.body;

        if(password !== confirmPassword){
            return res.status(400).json({error:"Password and Confirm Password do not match!"})        
        }
        const user = await User.findOne({username});
        if(user){
            return res.status(400).json({error: "Username already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt)

        // https://avatar-placeholder.iran.liara.run
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        })

        if(newUser){
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                password: newUser.password,
                gender: newUser.gender,
                profilePic: newUser.profilePic
            })
        }else{
            return res.status(400).json({error: "Invalid User Data"});
        }
    } catch (error) {
        console.log("Error in Signup Controller", error.message);
        res.status(500).json({error: "Internal Server Error"})
    }
}

export const loginUser = (req,res)=>{
    res.send("Login");
    console.log("login user");
}

export const logoutUser = (req,res)=>{
    res.send("Logout");
    console.log("logout user");
}



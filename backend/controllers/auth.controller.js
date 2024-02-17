import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";


export const signupUser = async (req,res)=>{
    try {
        console.log(req.body)
        //desturct the data recieved from frontend
        const {fullName, username, password, confirmPassword, gender} = req.body;
        //check if pass match or not
        if(password !== confirmPassword){
            return res.status(400).json({error:"Password and Confirm Password do not match!"})        
        }
        //check if user exists already
        const user = await User.findOne({username});
        if(user){
            return res.status(400).json({error: "Username already exists"});
        }

        //Hashing Password using Bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt)

        //Deciding profile pic acc. to gender of the user
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        
        //new user object is created
        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        })

        if(newUser){

            generateTokenAndSetCookie(newUser._id,res);

            await newUser.save(); //new user oject is saved.

            res.status(201).json({   //to check if user is correctly created or not
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

export const loginUser = async (req,res)=>{
    //res.send("Login")
    console.log(req.body);
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});
        const isPassCorrect = await bcrypt.compare(password, user?.password || "")
        if(!user || !isPassCorrect){
            return res.status(400).json({error: "Invalid username or password"});
        }
        generateTokenAndSetCookie(user._id,res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            password: user.password,
            gender: user.gender
        })
    } 
    catch (error) {
        console.log("Error in Login controller", error.message);
        res.status(500).json({error: "Internal Server Error"})
    }
    
}

export const logoutUser = (req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message: "Logged out successfully"})
        
    } catch (error) {
        console.log("Error in Logout controller", error.message);
        res.status(500).json({error: "Internal Server Error"})
    }
}



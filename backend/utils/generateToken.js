import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) =>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET,{
        expiresIn: '15d'
    })
    res.cookie("jwt",token,{
        maxAge: 15*23*60*60*1000, //millisecond format
        httpOnly: true, 
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development"
    })
}

export default generateTokenAndSetCookie;
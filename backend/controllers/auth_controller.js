const userModel=require("../models/User");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const tokenBlacklistModel=require("../models/tokenBlacklistModel");

async function registerUser(req,res){
    const {username,email,password}=req.body;

    if(!username || !email || !password){
        return res.status(400).json({message:"All fields are required"})
    }

    const isUserAlreadyExists = await userModel.findOne({
        $or: [ { username }, { email } ]//checking if user already exists with the same username or email
    })

    if (isUserAlreadyExists) {
        return res.status(400).json({
            message: "Account already exists with this email address or username"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser=await userModel.create({
        username, email, password:hashedPassword
    })

    const token=jwt.sign({id:newUser._id, username:newUser.username},process.env.JWT_SECRET,{expiresIn:"1d"})//creating a token for the user

    res.status(201).json({
        message:"User registered successfully",
        user:{
            id:newUser._id,
            username:newUser.username,
            email:newUser.email
        }
    })
}

async function LoginUser(req,res){
    const {email,password}=req.body;

    if(!email || !password){
        return res.status(400).json({message:"All fields are required"})//status code 404 means not found, 400 means bad request
    }

    const registeredUser=await userModel.findOne({email});

    if(!registeredUser){
      return res.status(400).json({
        message:"Account does not exist with this email address"
    })}

    const isPasswordMatch=await bcrypt.compare(password,registeredUser.password);

    if(!isPasswordMatch){
        return res.status(400).json({
            message:"Invalid password"
        })
    }

    const token=jwt.sign({id:registeredUser._id, username:registeredUser.username},process.env.JWT_SECRET,{expiresIn:"1d"})//creating a token for the user

    const isProduction=process.env.NODE_ENV === "production"

    res.cookie("token",token,{ //setting the token in the cookie
        httpOnly:true,
        secure:isProduction,//cookie only sent over HTTPS in production
        sameSite:isProduction ? "none" : "lax",//"none" allows the cookie to be sent cross-domain (frontend and backend on different domains in production)
        maxAge:24*60*60*1000//1 day
    })

    res.status(200).json({
        message:"User logged in successfully",
        user:{
            id:registeredUser._id,
            username:registeredUser.username,
            email:registeredUser.email
        }
    })
}

async function LogoutUser(req,res){
    const token=req.cookies.token;

    if(!token){
        return res.status(400).json({
            message:"User is not logged in"
        })
    }

    await tokenBlacklistModel.create({token})//adding the token to the blacklist

    const isProduction=process.env.NODE_ENV === "production"

    res.clearCookie("token",{ //must match the options used when the cookie was set, otherwise the browser won't clear it
        httpOnly:true,
        secure:isProduction,
        sameSite:isProduction ? "none" : "lax"
    })

    res.status(200).json({
        message:"User logged out successfully"
    })
}

async function getMeController(req, res) {

    const user = await userModel.findById(req.user.id)

    res.status(200).json({
        message: "User details fetched successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })

}

module.exports={registerUser,LoginUser,LogoutUser, getMeController}
const User = require("../models/userModel");
const errorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
// const crypto= require("crypto")
//Register a user
exports.registerUser = catchAsyncError( async(req,res,next)=>{
    
   const{name,email,password}=req.body;
    const user = await User.create({
        name,email,password
    });
   sendToken(user,201,res);
})


//LOgin user
exports.loginUser = catchAsyncError(async(req,res,next)=>{
    const {email,password}=req.body;
    
    //checking if user has given password and email both
    if(!email || !password){
        return next(new errorHandler("Please provide email and password",400))       
            }
            //checking if user is registered or not
            const user = await User.findOne({email}).select("+password");
            if(!user){
                return next(new errorHandler("Invalid email or password",401))
            }

          
            const isPasswordMatched =await user.comparePassword(password)
            console.log(isPasswordMatched)
            if(!isPasswordMatched){
                return next(new errorHandler("Invalid email or password",401))
            }
           
   sendToken(user,200,res);

});

//Logout User

exports.logoutUser = catchAsyncError(async(req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    });
    res.status(200).json({
        success:true,
        message:"Logged Out",
    });
});
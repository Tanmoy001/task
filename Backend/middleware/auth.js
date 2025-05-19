const errorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken")
const User = require("../models/userModel");


//checking the cookies whether the user is already loged in or not if loged in then fetching out the id of the user

exports. isAuthenticatedUser = catchAsyncErrors(async(req,res,next)=>{
    const {token} = req.cookies;
  /*   console.log(token); */
    if(!token){
        return next(new errorHandler("Please Login to your account",401));
    }
const decodedData = jwt.verify(token,process.env.JWT_SECRET);
req.user=await User.findById( decodedData._id);
/* console.log(req.user) */

next();
});
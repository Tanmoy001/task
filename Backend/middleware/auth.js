const errorHander = require("../utils/errorHander");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken")
const User = require("../models/userModel");


const jwt = require("jsonwebtoken");
const User = require("../models/userModel"); // Corrected path
const ErrorHandler = require("../utils/errorHandler"); // Corrected path
const catchAsyncErrors = require("./catchAsyncErrors");  // Corrected path

//checking the cookies whether the user is already loged in or not if loged in then fetching out the id of the user

exports. isAuthenticatedUser = catchAsyncError(async(req,res,next)=>{
    const {token} = req.cookies;
  /*   console.log(token); */
    if(!token){
        return next(new errorHander("Please Login to your account",401));
    }
const decodedData = jwt.verify(token,process.env.JWT_SECRET);
req.user=await User.findById( decodedData._id);
/* console.log(req.user) */

next();
});
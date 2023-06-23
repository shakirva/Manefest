const ErrorHander=require('../utils/errorhander');
const catchAsyncErrors=require('./catchAsyncErrors');
const User=require('../models/usermodels');
const jwt=require('jsonwebtoken');


exports.isAuthenticatedUser=catchAsyncErrors(async(req,res,next)=>{
    const {token}=req.cookies;
    if(!token){
        return next(new ErrorHander('Login first to access this resource',401));
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    req.user=await User.findById(decoded.id);
    next();
});     
exports.authorizeRoles=(...roles)=>{
    return(req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorHander(`Role (${req.user.role}) is not allowed to access this resource`,403));
        }
        next();
    }
}

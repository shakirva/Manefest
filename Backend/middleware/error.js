const ErrorHander = require('../utils/errorHander');


module.exports=(err,req,res,next)=>{
    err.statusCode=err.statusCode || 500;
    err.message=err.message || 'Internal Server Error'

    // mongodb id error
    if(err.name==='CastError'){
        const message=`Resource not found. Invalid: ${err.path}`;
        err= new ErrorHander(message,400); 
        
    }
    // mongoose validation error
    if(err.name==='ValidationError'){           
        const message=Object.values(err.errors).map(value=>value.message);
        err= new ErrorHander(message,400);
    }
    // mongoose duplicate key error
    if(err.code===11000){
        const message=`Duplicate ${Object.keys(err.keyValue)} entered`;
        err= new ErrorHander(message,400);
    }
    // wrong jwt error
    if(err.name==='JsonWebTokenError'){
        const message='JSON Web Token is invalid. Try Again!!!';
        err= new ErrorHander(message,400);
    }
    // jwt expired error
    if(err.name==='TokenExpiredError'){
        const message='JSON Web Token is expired. Try Again!!!';
        err= new ErrorHander(message,400);
    }

    
    


    res.status(err.statusCode).json({
        success:false,
        Error:err.message  
    });
};
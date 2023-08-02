module.exports= (myfunc) => (req,res,next)=> {
    Promise.resolve(myfunc(req,res,next)).catch(next);
}

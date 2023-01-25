
const Product = require("../models/productmodels");
const ErrorHander = require("../utils/errorHander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");



// Get all products => /api/v1/products
exports.getAllProducts =catchAsyncErrors(
    async(req,res) => {
        const products= await Product.find();
        res.status(200).json(
            {success:true,
             products
        });
    }
),


// Create new product --admin => /api/v1/product/new
exports.createProduct= catchAsyncErrors(async(req,res) => {
    const product= await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    })

}),
// Update product --admin => /api/v1/product/:id
exports.updateProdect= catchAsyncErrors(async(req,res,next)=>{
    let product =await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHander("product not found ",404))}
      
    
        
        product=await Product.findByIdAndUpdate(req.params.id, req.body,{
            new:true,
            runValidators:true,
            useFindAndModify:false
        } )
        res.status(200).json({
            success:true,
            product
        });



}),
exports.deleteProduct= async (req,res,next)=>{
     const product = await Product.findById(req.params.id);
     if(!product) {
        return next(new ErrorHander('Product not found',404))

     }
     await product.remove();
     res.status(200).json({
        success:true,
        message:'product delete successfully'
     })
},
// Get single product details => /api/v1/product/:id
exports.getProductDetails= async (req,res,next)=>{

    const product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHander('Product not found',404))}

            res.status(200).json({
                success:true,
                product
            });      
}


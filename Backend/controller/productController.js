
const Product = require("../models/productmodels");


// Get all products => /api/v1/products
exports.getAllProducts =async(req,res) => {
    const products= await Product.find();
    res.status(200).json(
        {success:true,
         products
    });
},


// Create new product --admin => /api/v1/product/new
exports.createProduct= async(req,res) => {
    const product= await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    })

},
// Update product --admin => /api/v1/product/:id
exports.updateProdect= async(req,res,next)=>{
    let product =await Product.findById(req.params.id);
    if(!product){
        return res.status(500).json({
            success:false,
            message:'product not found'})}
        
        product=await Product.findByIdAndUpdate(req.params.id, req.body,{
            new:true,
            runValidators:true,
            useFindAndModify:false
        } )
        res.status(200).json({
            success:true,
            product
        });



},
exports.deleteProduct= async (req,res,next)=>{
     const product = await Product.findById(req.params.id);
     if(!product) {
        return res.status(500).json({
            success:false,
            message:'message not found'
        })
     }
     await product.remove();
     res.status(200).json({
        success:true,
        message:'product delete successfully'
     })
},
exports.getProductDetails= async (req,res,next)=>{

    const product = await Product.findById(req.params.id);
    if(!product){
        return res.status(500).json({
            success:false,
            message:'product not found'})}

            res.status(200).json({
                success:true,
                product
            });      
}


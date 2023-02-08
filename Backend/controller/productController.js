const Product = require("../models/productmodels");
const ErrorHander = require("../utils/errorHander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const APIFeatures = require("../utils/apiFeatures");

// Get all products => /api/v1/products
(exports.getAllProducts = catchAsyncErrors(async (req, res) => {
  const resultPerPage = 5;
  const productCount = await product.countDocuments();
  const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await apiFeatures.query;
  res.status(200).json({ success: true, products, productCount });
})),
  // Create new product --admin => /api/v1/product/new
  (exports.createProduct = catchAsyncErrors(async (req, res) => {
    req.body.user = req.user.id;

    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      product,
      productCount,
    });
  })),
  // Update product --admin => /api/v1/product/:id
  (exports.updateProdect = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return next(new ErrorHander("product not found ", 404));
     ;
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({
      success: true,
      product,
    });
  })),
  (exports.deleteProduct = async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return next(new ErrorHander("Product not found", 404));
    }
    await product.remove();
    res.status(200).json({
      success: true,
      message: "product delete successfully",
    });
  }),
  // Get single product details => /api/v1/product/:id
  (exports.getProductDetails = async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return next(new ErrorHander("Product not found", 404));
    }

    res.status(200).json({
      success: true,
      product,
    });
  });

  // create new review and update the review
exports.createProductReview=catchAsyncErrors(async(req,res,next)=>{
  const {rating,comment,productId}=req.body;
  const review={
    user:req.user._id,
    name:req.user.name,
    rating:Number(rating),
    comment
  }
  const product= await Product.findById(productId);
  const isReviewed=product.reviews.find(r=>r.user.toString()===req.user._id.toString());
  if(isReviewed){
    product.reviews.forEach(review=>{
      if(review.user.toString()===req.user._id.toString()){
        review.comment=comment;
        review.rating=rating;
      }
    })
  }else{
    product.reviews.push(review);
    product.numOfReviews=product.reviews.length;
  }
  product.ratings=product.reviews.reduce((acc,item)=>item.rating+acc,0)/product.reviews.length;
  await product.save({validateBeforeSave:false});
  res.status(200).json({
    success:true
  })
}
)

// get all reviews of a product
exports.getProductReviews=catchAsyncErrors(async(req,res,next)=>{
  const product= await Product.findById(req.query.id);
  if(!product){
    return next(new ErrorHander(`Product not found with id: ${req.query.id}`));
  }

  res.status(200).json({
    success:true,
    reviews:product.reviews
  })
}
) 

// delete a review of a product
exports.deleteReview=catchAsyncErrors(async(req,res,next)=>{
  const product= await Prodcut.findById(req.query.productId);
  if(!product){
    return next(new ErrorHander(`Product not found with id: ${req.query.productId}`));
  }
  const reviews=product.reviews.filter(review=>review._id.toString()!==req.query.id.toString());
  const numOfReviews=reviews.length;
  const ratings=reviews.reduce((acc,item)=>item.rating+acc,0)/reviews.length;
  await Product.findByIdAndUpdate(req.query.productId,{
    reviews,
    ratings,
    numOfReviews
  },{
    new:true,
    runValidators:true,
    useFindAndModify:false
  })
  res.status(200).json({
    success:true
  })  
}
)


  
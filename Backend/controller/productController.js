const Product = require("../models/productmodels");
const ErrorHander = require("../utils/errorHander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const APIFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");
 

// Get all products => /api/v1/products

exports.getAllProducts = catchAsyncErrors(async (req, res) => {
  const resultPerPage = 8 ;
  
  const productsCount = await Product.countDocuments();
  const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await apiFeatures.query;
  res.status(200).json({ success: true, products, productsCount, resultPerPage });
})

// Get All Product (Admin)
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
      success: true,
      products,
  });
});
 //Create Product --ADMIN
exports.createProduct = catchAsyncErrors(async (req, res, next) => {

  let images = [];

  if (typeof req.body.images === "string" || typeof req.body.images === []) {
      images.push(req.body.images);
  } else {
      images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
          folder: "products",
      });

      imagesLinks.push({
          public_id: result.public_id,
          url: result.secure_url,
      });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(201).json({
      success: true,
      product,
  });
  // req.body.user = req.user.id;
  // const product = await Product.create(req.body);

  // res.status(201).json({
  //     success: true,
  //     product
  // })
});
  // Update Product -- Admin

exports.updateProdect = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  // Images Start Here
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
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
});
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
  (exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return next(new ErrorHander("Product not found", 404));
    }

    res.status(200).json({
      success: true,
      product,
    });
  }));

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


  
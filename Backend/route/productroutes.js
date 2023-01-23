
const express= require('express');
const { getAllProducts,createProduct,updateProdect, deleteProduct, getProductDetails} = require('../controller/productController');
const router=express.Router();

router.route('/products').get(getAllProducts);
router.route('/product/new').post(createProduct);
router.route('/product/:id').put(updateProdect).delete(deleteProduct).get(getProductDetails);


module.exports= router;



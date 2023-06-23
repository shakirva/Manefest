const Orde = require("../models/ordermodels");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");


// Create new order => /api/v1/order/new
exports.newOrder = catchAsyncErrors(async (req, res) => {
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
    } = req.body;
    
    const order = await Orde.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user._id,
    });
    
    res.status(200).json({
        success: true,
        order,
    });
    });

// Get single order => /api/v1/order/:id
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Orde.findById(req.params.id).populate('user', 'name email');
    
    if (!order) {
        return next(new ErrorHander('No order found with this ID', 404));
    }
    
    res.status(200).json({
        success: true,
        order,
    });
    });

// Get logged in user orders => /api/v1/orders/me
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Orde.find({ user: req.user.id });
    
    res.status(200).json({
        success: true,
        orders,
    });
    });

// Get all orders - Admin => /api/v1/admin/orders/
exports.allOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Orde.find();
    
    let totalAmount = 0;
    
    orders.forEach(order => {
        totalAmount += order.totalPrice;
    });
    
    res.status(200).json({
        success: true,
        totalAmount,
        orders,
    });
    });

    // Update / Process order - Admin => /api/v1/admin/order/:id
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Orde.findById(req.params.id);
    
    if (order.orderStatus === 'Delivered') {
        return next(new ErrorHander('You have already delivered this order', 400));
    }
    
    order.orderItems.forEach(async item => {
        await updateStock(item.product, item.quantity);
    });
    
    order.orderStatus = req.body.status;
    if(req.body.status === 'Delivered'){
    order.deliveredAt = Date.now();
    }
    
    await order.save({validationBeforeSave:false})
    
    res.status(200).json({
        success: true,
    });
    });

    async function updateStock(id, quantity) {
        const product= await Product.findById(id);
        product.stock = product.stock - quantity;
        await product.save({validationBeforeSave:false});
    }


// Delete order => /api/v1/admin/order/:id
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Orde.findById(req.params.id);
    
    if (!order) {
        return next(new ErrorHander('No order found with this ID', 404));
    }
    
    await order.remove();
    
    res.status(200).json({
        success: true,
    });
    });



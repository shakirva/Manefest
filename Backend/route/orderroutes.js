const express=require('express')
const route=express.Router()

const {newOrder,getSingleOrder,myOrders,allOrders,updateOrder,deleteOrder}=require('../controller/orderController')
const {isAuthenticatedUser,authorizeRoles}=require('../middleware/auth')


route.route('/order/new').post(isAuthenticatedUser,newOrder)
route.route('/order/:id').get(isAuthenticatedUser,getSingleOrder)
route.route('/orders/me').get(isAuthenticatedUser,myOrders)
route.route('/admin/orders').get(isAuthenticatedUser,authorizeRoles('admin'),allOrders)
route.route('/admin/order/:id').put(isAuthenticatedUser,authorizeRoles('admin'),updateOrder)
route.route('/admin/order/:id').delete(isAuthenticatedUser,authorizeRoles('admin'),deleteOrder)

module.exports=route


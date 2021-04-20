const express = require('express')
const orderController = require('../controller/order')
const { isAuth } = require('../middlewares/auth')

const orderRoute = express.Router()

orderRoute.post("/", isAuth, orderController.placeOrder)
orderRoute.get('/myorder', isAuth, orderController.myOrderList)  //put this before getOrder route otherwise "myorder" will be considered as :id and getOrder will be called instead
orderRoute.get("/:id", orderController.getOrder)
orderRoute.put(":id/pay", isAuth, orderController.updateOrder)

module.exports = orderRoute
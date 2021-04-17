const express = require('express')
const orderController = require('../controller/order')
const { isAuth } = require('../middlewares/auth')

const orderRoute = express.Router()

orderRoute.post("/", isAuth, orderController.placeOrder)
orderRoute.get("/:id", orderController.getOrder)

module.exports = orderRoute
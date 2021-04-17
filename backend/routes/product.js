const express = require('express')
const productController = require('../controller/product')

const productRoute = express.Router()

productRoute.get("/seed", productController.addToDbFromFile)
productRoute.get("/", productController.getProducts)
productRoute.get("/:id", productController.getProductById)

module.exports = productRoute
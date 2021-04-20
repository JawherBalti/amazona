const express = require('express')
const userController = require('../controller/user')

const userRoute = express.Router()

userRoute.post("/register", userController.register)
userRoute.post("/signin", userController.login)
userRoute.get("/:id", userController.getUser)
module.exports = userRoute
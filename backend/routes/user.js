const express = require('express')
const userController = require('../controller/user')
const { isAuth } = require('../middlewares/auth')
const userRoute = express.Router()

userRoute.post("/register", userController.register)
userRoute.post("/signin", userController.login)
userRoute.put("/profile", isAuth, userController.updateUser)
userRoute.get("/:id", userController.getUser)

module.exports = userRoute
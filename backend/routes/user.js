const express = require('express')
const userController = require('../controller/user')
const { isAuth } = require('../middlewares/auth')
const userRoute = express.Router()

userRoute.post("/register", userController.register)
userRoute.post("/signin", userController.login)
userRoute.post("/activate", userController.activateAccount)
userRoute.put("/profile", isAuth, userController.updateUser)
userRoute.get("/getusers", isAuth, userController.getUsers)
userRoute.get("/:id", userController.getUser)

module.exports = userRoute
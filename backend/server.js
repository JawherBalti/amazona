const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const userRoute = require('./routes/user')
const orderRoute = require('./routes/order')
const data = require('./data')

dotenv.config()

const app = express()
app.use(express.json())

app.use('/api/user', userRoute)
app.use('/api/order', orderRoute)

app.get("/api/products", (req, res) => {
    res.send(data.products)
})

app.get("/api/products/:id", (req, res) => {
    const product = data.products.find(index => index._id === req.params.id)
    if (product) res.send(product)
    else res.status(404).send({ message: "Product not found!" })
})

const port = process.env.PORT || 5000
const db_uri = process.env.MONGO_URI

mongoose.connect(db_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
mongoose.connection.once("open", () => {
    console.log("Connection to database established")
})

app.listen(port, () => console.log(`server is running on port ${port}`))
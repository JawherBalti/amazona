const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const userRoute = require('./routes/user')
const orderRoute = require('./routes/order')
const productRoute = require('./routes/product')

dotenv.config()

const app = express()
app.use(express.json())

app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb')
})

app.use('/api/user', userRoute)
app.use('/api/order', orderRoute)
app.use('/api/products', productRoute)


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
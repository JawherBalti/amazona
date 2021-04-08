const express = require('express')
const data = require('./data')

const app = express()
app.get("/api/products", (req, res) => {
    res.send(data.products)
})

app.get("/api/products/:id", (req, res) => {
    const product = data.products.find(index => index._id === req.params.id)
    if(product) res.send(product)
    else res.status(404).send({message: "Product not found!"})
})

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`server is running on port ${port}`))
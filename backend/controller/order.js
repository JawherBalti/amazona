const { Order } = require('../models/order')

const placeOrder = (req, res) => {
    if (req.body.orderItems.length === 0) {
        res.status(400).send({ message: "Cart is empty" })
    } else {
        const order = new Order({
            orderItems: req.body.orderItems,
            shippingAddress: req.body.shippingAddress,
            paymentMethod: req.body.paymentMethod,
            itemsPrice: req.body.itemsPrice,
            shippingPrice: req.body.shippingPrice,
            taxPrice: req.body.taxPrice,
            totalPrice: req.body.totalPrice,
            user: req.user._id
        })
        order.save()
            .then(order => res.status(201).send({ message: 'New Order Created', order }))
            .catch(err => res.status(400).send({ message: 'error' }))
    }
}

const getOrder = (req, res) => {
    Order.findById(req.params.id)
        .then(order => res.send(order))
        .catch(err => res.status(404).send({ message: "Order not found!" }))
}

const updateOrder = (req, res) => {
    Order.findById(req.params.id)
        .then(order => {
            order.isPaid = true
            order.paidAt = Date.now()
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.email_address
            }
            order.save()
                .then((order) => res.send({ message: "Order paid", order }))
                .catch(err => res.status(400).send({ message: "An error occured during payment!" }))
        })
        .catch(err => res.status(404).send({ message: "Order not found!" }))
}

const myOrderList = (req, res) => {
    console.log(req.user._id)
    Order.find({user: req.user._id})
    .then(orders => res.send(orders))
    .catch(err => res.status(404).send({message: "Not Found"}))
}

module.exports = { placeOrder, getOrder, updateOrder, myOrderList }
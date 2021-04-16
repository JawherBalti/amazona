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
            .then(() => res.status(201).send({ message: "New order created", order: createdOrder }))
            .catch(error => res.status(400).json({ message: "Error while creating order!" }))
    }
}

module.exports = { placeOrder }
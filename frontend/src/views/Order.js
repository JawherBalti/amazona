import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { detailsOrder } from '../actions/order'

export default function Order(props) {
    const orderId = props.match.params.id
    const orderDetails = useSelector(state => state.orderDetailsReducer)

    const { order, loading, error } = orderDetails
    console.log(order);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(detailsOrder(orderId))
    }, [dispatch, orderId])

    return loading ? (<LoadingBox></LoadingBox>) :
        error ? (<MessageBox variant="danger">{error}</MessageBox>)
            : (
                <div>
                    <h1>Order {order.data._id}</h1>
                    <div className="row top">
                        <div className="col-2">
                            <ul>
                                <li>
                                    <div className="card card-body">
                                        <h2>Shipping</h2>
                                        <p>
                                            <strong>Name:</strong> {order.data.shippingAddress.name} <br />
                                            <strong>Address:</strong> {order.data.shippingAddress.address},
                                            {order.data.shippingAddress.city},
                                            {order.data.shippingAddress.postalCode},
                                            {order.data.shippingAddress.country}
                                        </p>
                                        {
                                            order.data.isDelivered ?
                                                <MessageBox variant="success">Delivered at: {order.data.deliveredAt}</MessageBox> :
                                                <MessageBox variant="danger">Not delivered</MessageBox>
                                        }
                                    </div>
                                </li>
                                <li>
                                    <div className="card card-body">
                                        <h2>Payment</h2>
                                        <p>
                                            <strong>Method:</strong> {order.data.paymentMethod} <br />
                                        </p>
                                        {
                                            order.data.isPaid ?
                                                <MessageBox variant="success">Paid at: {order.data.paidAt}</MessageBox> :
                                                <MessageBox variant="danger">Not paid</MessageBox>
                                        }
                                    </div>
                                </li>
                                <li>
                                    <div className="card card-body">
                                        <h2>Order Items</h2>
                                        <ul>
                                            {order.data.orderItems.map(item => (
                                                <li key={item.product}>
                                                    <div className="row">
                                                        <div>
                                                            <img src={item.image} alt={item.name} className="small" />
                                                        </div>
                                                        <div className="min-30">
                                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                        </div>
                                                        <div>{item.qty} x ${item.price} = ${item.qty * item.price}</div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="col-1">
                            <div className="card card-body">
                                <ul>
                                    <li>
                                        <h2>Order Summary</h2>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div>Items:</div>
                                            <div>${order.data.itemsPrice.toFixed(2)}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div>Shipping:</div>
                                            <div>${order.data.shippingPrice.toFixed(2)}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div>Tax:</div>
                                            <div>${order.data.taxPrice.toFixed(2)}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div>
                                                <strong>Total:</strong>
                                            </div>
                                            <div>
                                                <strong>${order.data.totalPrice.toFixed(2)}</strong>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )
}

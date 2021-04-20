import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { myOrders } from '../actions/order'

export default function OrderHistory(props) {
    const myOrderList = useSelector(state => state.myOrderReducer)
    const { loading, error, orders } = myOrderList

    const userSignIn = useSelector(state => state.userSignInReducer)
    const { userInfo } = userSignIn

    if (!userInfo) {
        props.history.push("/signin")
    }

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(myOrders())
    }, [dispatch])
    return (
        <div>
            <div>Order history</div>
            {loading ? <LoadingBox></LoadingBox> :
                error ? <MessageBox variant="danger">{error}</MessageBox> :
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Paid</th>
                                <th>Delivered</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt}</td>
                                    <td>{order.totalPrice.toFixed(2)}</td>
                                    <td>{order.isPaid ? order.paidAt.substring(0, 10) : "Not Paid"}</td>
                                    <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : "Not Delivered"}</td>
                                    <td>
                                        <button type="button" className="small" onClick={() => { props.history.push(`/order/${order._id}`) }}>Details</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>}
        </div>
    )
}

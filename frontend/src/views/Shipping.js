import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../actions/cart'
import CheckoutSteps from '../components/CheckoutSteps'

export default function Shipping(props) {

    const cart = useSelector(state => state.cartReducer)
    const { shippingAddress } = cart
    
    const [name, setName] = useState(shippingAddress.name)
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const signinReducer = useSelector(state => state.userSignInReducer)
    const { userInfo } = signinReducer

    if (!userInfo) {
        props.history.push("/signin")
    }

    const data = { name, address, city, postalCode, country }

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress(data))
        props.history.push("/payment")
    }
    return (
        <div>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Shipping address</h1>
                </div>
                <div>
                    <label htmlFor="name">Name</label>
                    <input id="name" type="text" placeholder="Enter your name" value={name} onChange={e => setName(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="address">Address</label>
                    <input id="address" type="text" placeholder="Enter your address" value={address} onChange={e => setAddress(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="city">City</label>
                    <input id="city" type="text" placeholder="Enter your city name" value={city} onChange={e => setCity(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="postalCode">Postal Code</label>
                    <input id="postalCode" type="text" placeholder="Enter your postal code" value={postalCode} onChange={e => setPostalCode(e.target.value)} required />
                </div>

                <div>
                    <label htmlFor="country">Country</label>
                    <input id="country" type="text" placeholder="Enter your country" value={country} onChange={e => setCountry(e.target.value)} required />
                </div>
                <div>
                    <label />
                    <button className="primary" type="submit">Continue</button>
                </div>
            </form>
        </div>
    )
}

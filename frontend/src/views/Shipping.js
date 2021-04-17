import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../actions/cart'
import CheckoutSteps from '../components/CheckoutSteps'
import axios from 'axios'

export default function Shipping(props) {
    const cart = useSelector(state => state.cartReducer)
    const { shippingAddress } = cart

    const [name, setName] = useState(shippingAddress.name)
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)
    const [countryPicker, setCountryPicker] = useState([])
    const [cityPicker, setCityPicker] = useState([])

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
    useEffect(() => {
        async function fetchData() {
            const countriesData = await axios.get("https://countriesnow.space/api/v0.1/countries/states")
            setCountryPicker(countriesData.data.data)
            console.log(country);
            console.log(countriesData.data.data);
            setCityPicker(countriesData.data.data.filter(countryData => countryData.name === country)[0].states)
        }
        fetchData();
    }, [country])
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
                    <label htmlFor="country">Country</label>
                    <select onChange={e => setCountry(e.target.value)}>
                        <option value={country}>{country}</option>
                        {countryPicker.map((country, i) =>
                            <option key={i} value={country.name}>{country.name}</option>
                        )}
                    </select>
                </div>
                <div>
                    <label htmlFor="city">City</label>
                    <select onChange={e => setCity(e.target.value)}>
                        <option value={city}>{city}</option>
                        {cityPicker.map((city, i) =>
                            <option key={i} value={city.name}>{city.name}</option>
                        )}
                    </select>
                </div>
                <div>
                    <label htmlFor="postalCode">Postal Code</label>
                    <input id="postalCode" type="text" placeholder="Enter your postal code" value={postalCode} onChange={e => setPostalCode(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="address">Address</label>
                    <input id="address" type="text" placeholder="Enter your address" value={address} onChange={e => setAddress(e.target.value)} required />
                </div>
                <div>
                    <label />
                    <button className="primary" type="submit">Continue</button>
                </div>
            </form>
        </div>
    )
}

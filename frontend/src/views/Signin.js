import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signin } from '../actions/user'

export default function Signin() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const dispatch = useDispatch()
    
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(signin(email, password))
    }
    return (
        <div >
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Sign In</h1>
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="text" placeholder="Enter your email" required onChange={e => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" placeholder="Enter your password" required onChange={e => setPassword(e.target.value)} />
                </div>
                <div>
                    <label />
                    <button className="primary" type="submit" >Sign In</button>
                </div>
                <div>
                    <label />
                    <div>New customer? {' '}
                        <Link to="/register">Create an account</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

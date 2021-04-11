import React, { useState } from 'react'

export default function Register() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword1] = useState("")
    const [password2, setPassword2] = useState("")

    const submitHandler = (e) => {
        console.log(e);
    }
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Register</h1>
                </div>
                <div>
                    <label htmlFor="name">Name</label>
                    <input id="name" type="text" placeholder="Enter your name" required onChange={e => setName(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="text" placeholder="Enter your email" required onChange={e => setEmail(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="password1">Password</label>
                    <input id="password1" type="password" placeholder="Enter your password" required onChange={e => setPassword1(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="password2">Confirm Password</label>
                    <input id="password2" type="password" placeholder="Confirm your password" required onChange={e => setPassword2(e.target.value)}/>
                </div>
                <div>
                    <label />
                    <button className="primary" type="submit">Create your account</button>
                </div>
            </form>
        </div>
    )
}

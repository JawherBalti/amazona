import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userDetailss } from '../actions/user'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

export default function Profile(props) {
    const userSignIn = useSelector(state => state.userSignInReducer)
    const { userInfo } = userSignIn

    const userDetails = useSelector(state => state.userDetailsReducer)
    const { loading, error, user } = userDetails
    
    if(!userInfo) {
        props.history.push("/signin")
    }

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(userDetailss(userInfo.data.user._id))
    }, [dispatch]) //do not add user info because when logout useEffect will trigger and userInfo is undefined which causes an error

    const submitHandler = (e) => {
        e.preventDefailt()
    }
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>User Profile</h1>
                </div>
                {
                    loading ? <LoadingBox></LoadingBox> :
                        error ? <MessageBox variant="danger">{error}</MessageBox> :
                            <>
                                <div>
                                    <label htmlFor="name">Name</label>
                                    <input id="name" type="text" placeholder="Enter your name" value={user.name} />
                                </div>
                                <div>
                                    <label htmlFor="password">New Password</label>
                                    <input id="password" type="password" placeholder="Enter your password" />
                                </div>
                                <div>
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <input id="confirmPassword" type="password" placeholder="Confirm your new password" />
                                </div>
                                <div>
                                    <label/>
                                    <button className="primary" type="submit">Update</button>
                                </div>
                            </>
                }
            </form>
        </div>
    )
}

import { USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT } from "./types"
import axios from 'axios'

export const signin = (email, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } })
    try {
        const request = await axios.post("/api/user/signin", { email, password })
        console.log(request);
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: request })
        localStorage.setItem("userInfo", JSON.stringify(request))
    } catch (err) {
        dispatch({ type: USER_SIGNIN_FAIL, payload: err.response && err.response.data.message ? err.response.data.message : err.message })
    }
}

export const register = (name, email, password) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST, payload: { name, email, password } })
    try {
        const request = await axios.post("/api/user/register", { name, email, password })
        dispatch({ type: USER_REGISTER_SUCCESS, payload: request })
    } catch(err) {
        dispatch({type: USER_REGISTER_FAIL, payload: err.response && err.response.data.message ? err.response.data.message : err.message})
    }
}

export const signout = () => (dispatch) => {
    localStorage.removeItem("userInfo")
    localStorage.removeItem("cartItems")
    localStorage.removeItem("shippingAddress")
    dispatch({type: USER_SIGNOUT})
}

export const userDetailss = (userId) => async(dispatch, getState) => {
    dispatch({type: USER_DETAILS_REQUEST, payload: userId})
    const { userSignInReducer: { userInfo } } = getState()
    try {
        const { data } = await axios.get(`/api/user/${userId}`, {
            headers: { authorization: `Bearer ${userInfo.data.token}` }
        })
        dispatch({ type: USER_DETAILS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: USER_DETAILS_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message })
    }
}
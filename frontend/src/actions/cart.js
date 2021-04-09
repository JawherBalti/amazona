import axios from "axios"
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "./types"

export const addToCart = (productId, qty) => async (dispatch, getState) => {
    const request = await axios.get(`/api/products/${productId}`)
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            name: request.data.name,
            image: request.data.image,
            price: request.data.price,
            countInStock: request.data.countInStock,
            product: request.data._id,
            qty,
        }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cartReducer.cartItems))
}

export const removeFromCart = (productId) => async (dispatch, getState) => {
    dispatch({ type: CART_REMOVE_ITEM, payload: productId })
    localStorage.setItem('cartItems', JSON.stringify(getState().cartReducer.cartItems))
}
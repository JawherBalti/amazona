import { combineReducers } from 'redux'
import { productsListReducer, productDetailsReducer } from './products'
import { cartReducer } from './cart'
import {userUpdateReducer, userSignInReducer, userRegisterReducer, userDetailsReducer, activateAccountReducer, getUsersReducer, adminUpdateReducer } from './user'
import { allOrdersReducer, myOrderReducer, orderReducer, orderDetailsReducer, orderPayReducer } from './order'

const rootReducer = combineReducers({
    productsListReducer,
    productDetailsReducer,
    cartReducer,
    userSignInReducer,
    userRegisterReducer,
    activateAccountReducer,
    allOrdersReducer,
    orderReducer,
    orderDetailsReducer,
    orderPayReducer,
    myOrderReducer,
    userDetailsReducer,
    userUpdateReducer,
    adminUpdateReducer,
    getUsersReducer
})

export default rootReducer
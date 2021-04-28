import { combineReducers } from 'redux'
import { productsListReducer, productDetailsReducer } from './products'
import { cartReducer } from './cart'
import {userUpdateReducer, userSignInReducer, userRegisterReducer, userDetailsReducer, activateAccountReducer } from './user'
import { myOrderReducer, orderReducer, orderDetailsReducer, orderPayReducer } from './order'

const rootReducer = combineReducers({
    productsListReducer,
    productDetailsReducer,
    cartReducer,
    userSignInReducer,
    userRegisterReducer,
    activateAccountReducer,
    orderReducer,
    orderDetailsReducer,
    orderPayReducer,
    myOrderReducer,
    userDetailsReducer,
    userUpdateReducer
})

export default rootReducer
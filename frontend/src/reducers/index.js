import { combineReducers } from 'redux'
import { productsListReducer, productDetailsReducer } from './products'
import { cartReducer } from './cart'
import { userSignInReducer, userRegisterReducer } from './user'
import { orderReducer, orderDetailsReducer } from './order'

const rootReducer = combineReducers({
    productsListReducer,
    productDetailsReducer,
    cartReducer,
    userSignInReducer,
    userRegisterReducer,
    orderReducer,
    orderDetailsReducer
})

export default rootReducer
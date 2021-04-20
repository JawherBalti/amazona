import { combineReducers } from 'redux'
import { productsListReducer, productDetailsReducer } from './products'
import { cartReducer } from './cart'
import { userSignInReducer, userRegisterReducer, userDetailsReducer } from './user'
import { myOrderReducer, orderReducer, orderDetailsReducer, orderPayReducer } from './order'

const rootReducer = combineReducers({
    productsListReducer,
    productDetailsReducer,
    cartReducer,
    userSignInReducer,
    userRegisterReducer,
    orderReducer,
    orderDetailsReducer,
    orderPayReducer,
    myOrderReducer,
    userDetailsReducer
})

export default rootReducer
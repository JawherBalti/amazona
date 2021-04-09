import { combineReducers } from 'redux'
import { productsListReducer, productDetailsReducer } from './products'
import { cartReducer } from './cart'

const rootReducer = combineReducers({
    productsListReducer,
    productDetailsReducer,
    cartReducer
})

export default rootReducer
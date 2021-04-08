import { combineReducers } from 'redux'
import {productsListReducer, productDetailsReducer} from './products'

const rootReducer = combineReducers({
    productsListReducer,
    productDetailsReducer
})

export default rootReducer
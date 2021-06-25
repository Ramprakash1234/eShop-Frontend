import {combineReducers} from 'redux'
import cartReducer from './cartReducer';
import orderReducer from './orderReducer';
export default combineReducers({
    cartReducer,
    orderReducer
})
import {combineReducers} from 'redux';
import cartReducer from './cartReducer';

const myReducer = combineReducers({
    cart: cartReducer,
});

export default myReducer;
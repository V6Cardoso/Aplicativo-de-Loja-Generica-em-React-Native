import {combineReducers} from 'redux';
import cartReducer from './cartReducer';
import productsReducer from './productsReducer';

const myReducer = combineReducers({
    cart: cartReducer,
    products: productsReducer
});

export default myReducer;
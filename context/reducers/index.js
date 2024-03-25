import {combineReducers} from 'redux';
import cartReducer from './cartReducer';
import productsReducer from './productsReducer';
import categoriesReducer from './categoriesReducer';

const myReducer = combineReducers({
    cart: cartReducer,
    products: productsReducer,
    categories: categoriesReducer
});

export default myReducer;
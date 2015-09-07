import { combineReducers } from 'redux';
import books from './books';
import cart from './cart';

export default combineReducers({
  books,
  cart
});

import { combineReducers }  from 'redux';
import books                from './books';
import cart                 from './cart';
import discount             from './discount';

export default combineReducers({ books, cart, discount });

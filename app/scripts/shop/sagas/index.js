import sagaMiddleware from 'redux-saga';
import fetchBooks from './fetchBooks';
import queryDiscount from './queryDiscount';

export default sagaMiddleware(fetchBooks, queryDiscount);

import { keys } from 'ramda';
import { fork, take, put, call } from 'redux-saga';
import { ADD_BOOK_TO_CART, REMOVE_BOOK_FROM_CART } from '../actionTypes';
import { getBestOffer } from '../webApi';
import * as actions from '../actionCreators';

export default function* queryDiscount (getState){
  while( yield take([ADD_BOOK_TO_CART, REMOVE_BOOK_FROM_CART]) ) {

    let state       = getState();
    let totalPrice  = state.cart.totalPrice;
    let isbns       = keys(state.cart.books);

    try {
      const discount = yield call(getBestOffer, totalPrice, isbns);
      yield put(actions.receiveDiscount(discount));
    } catch(e) {
      if (e.status === 404) {
        yield put(actions.resetDiscount(null));
      } else {
        yield put(actions.serverError(e));
      }
    }
 }
};

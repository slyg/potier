import { keys } from 'ramda';
import { getBestOffer } from '../webApi';
import {
  RECEIVE_SERVER_ERROR,
  RECEIVE_DISCOUNT,
  ADD_BOOK_TO_CART
} from '../constants';

export default function (book) {

  return async function (dispatch, getState) {

    dispatch({ type: ADD_BOOK_TO_CART, book });

    let state       = getState();
    let totalPrice  = state.cart.totalPrice;
    let isbns       = keys(state.cart.books);

    try {

      let discount = await getBestOffer(totalPrice, isbns);
      dispatch({ type: RECEIVE_DISCOUNT, discount });

    } catch(error) {

      dispatch({ type: RECEIVE_SERVER_ERROR, error });

    }

  };

};

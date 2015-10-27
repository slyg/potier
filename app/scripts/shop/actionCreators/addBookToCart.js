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

    const state       = getState();
    const totalPrice  = state.cart.totalPrice;
    const isbns       = keys(state.cart.books);

    try {

      const discount = await getBestOffer(totalPrice, isbns);
      dispatch({ type: RECEIVE_DISCOUNT, discount });

    } catch(error) {

      dispatch({ type: RECEIVE_SERVER_ERROR, error });

    }

  };

};

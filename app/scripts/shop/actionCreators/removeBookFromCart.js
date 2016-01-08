import { keys } from 'ramda';
import { getBestOffer } from '../webApi';
import {
  RECEIVE_SERVER_ERROR,
  RECEIVE_DISCOUNT,
  RESET_DISCOUNT,
  REMOVE_BOOK_FROM_CART
} from '../actionTypes';

export default function (book) {

  return async function (dispatch, getState) {

    dispatch({ type: REMOVE_BOOK_FROM_CART, book });

    const state       = getState();
    const totalPrice  = state.cart.totalPrice;
    const isbns       = keys(state.cart.books);

    if (!isbns.length){
      return dispatch({ type: RESET_DISCOUNT });
    }

    try {

      const discount = await getBestOffer(totalPrice, isbns);
      dispatch({ type: RECEIVE_DISCOUNT, discount });

    } catch(error) {

      if (error.status === 404) {
        return dispatch({ type: RECEIVE_DISCOUNT, discount: null });
      }
      dispatch({ type: RECEIVE_SERVER_ERROR, error });

    }

  };

};

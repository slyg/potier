import { keys } from 'ramda';
import { getBestOffer } from '../webApi';
import {
  RECEIVE_SERVER_ERROR,
  RECEIVE_DISCOUNT,
  RESET_DISCOUNT,
  REMOVE_BOOK_FROM_CART
} from '../constants';

export default function (book) {

  return async function (dispatch, getState) {

    dispatch({ type: REMOVE_BOOK_FROM_CART, book });

    let state       = getState();
    let totalPrice  = state.cart.totalPrice;
    let isbns       = keys(state.cart.books);

    if (!isbns.length){
      return dispatch({ type: RESET_DISCOUNT });
    }

    try {

      let discount = await getBestOffer(totalPrice, isbns);
      dispatch({ type: RECEIVE_DISCOUNT, discount });

    } catch(error) {

      if (error.status === 404) {
        return dispatch({ type: RECEIVE_DISCOUNT, discount: null });
      }
      dispatch({ type: RECEIVE_SERVER_ERROR, error });

    }

  };

};

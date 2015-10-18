import { keys } from 'ramda';
import { getBestOffer } from '../webApi';
import {
  RECEIVE_SERVER_ERROR,
  RECEIVE_DISCOUNT,
  ADD_BOOK_TO_CART
} from '../constants';

export default function (book) {

  return (dispatch, getState) => {

    dispatch({ type: ADD_BOOK_TO_CART, book });

    let state       = getState();
    let totalPrice  = state.cart.totalPrice;
    let isbns       = keys(state.cart.books);

    return getBestOffer(totalPrice, isbns).then(
      discount => dispatch({ type: RECEIVE_DISCOUNT, discount }),
      error    => dispatch({ type: RECEIVE_SERVER_ERROR, error })
    );

  };

};

import { keys } from 'ramda';
import { getBestOffer } from '../webApi';
import {
  RECEIVE_SERVER_ERROR,
  RECEIVE_BEST_OFFER,
  RESET_BEST_OFFER,
  REMOVE_BOOK_FROM_CART
} from '../constants';

export default function (book) {

  return (dispatch, getState) => {

    dispatch({ type: REMOVE_BOOK_FROM_CART, book });

    let state       = getState();
    let totalPrice  = state.cart.totalPrice;
    let isbns       = keys(state.cart.books);

    if (!isbns.length){
      return dispatch({ type: RESET_BEST_OFFER });
    }

    return getBestOffer(totalPrice, isbns).then(
      bestOffer => dispatch({ type: RECEIVE_BEST_OFFER, bestOffer }),
      error     => {
        if (error.status === 404) {
          return dispatch({ type: RECEIVE_BEST_OFFER, bestOffer: null });
        }
        dispatch({ type: RECEIVE_SERVER_ERROR, error });
      }
    );

  };

};

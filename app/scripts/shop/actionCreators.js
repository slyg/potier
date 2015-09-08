import {
  RECEIVE_SERVER_ERROR,
  RECEIVE_BEST_OFFER,
  SEARCH_BOOK_START,
  RECEIVE_BOOKS,
  ADD_BOOK_TO_CART,
  REMOVE_BOOK_FROM_CART
} from './constants';
import R from 'ramda';
import { getBooks, getBestOffer } from './webApi';

let handleServerError = (error) => {
  return {
    type: RECEIVE_SERVER_ERROR,
    error
  };
};

let receiveBestOffer = (bestOffer) => {
  return {
    type: RECEIVE_BEST_OFFER,
    bestOffer
  };
};

let reveiveBooks = (books) => {
  return {
    type: RECEIVE_BOOKS,
    books
  };
}

export function queryBooks() {

  return dispatch => {

    dispatch({
      type: SEARCH_BOOK_START
    });

    return getBooks()
      .then(
        books => dispatch(reveiveBooks(books)),
        error => dispatch(handleServerError(error))
      );
  };

};

export function addBookToCart (book) {

  return (dispatch, getState) => {

    dispatch({
      type: ADD_BOOK_TO_CART,
      book
    });

    let state = getState();
    let totalPrice = state.cart.totalPrice;
    let isbns = R.keys(state.cart.books);

    return getBestOffer(totalPrice, isbns)
      .then(
        bestOffer => dispatch(receiveBestOffer(bestOffer)),
        error => dispatch(handleServerError(error))
      )
    ;

  };

};

export function removeFromCart (book) {

  return (dispatch, getState) => {

    dispatch({
      type: REMOVE_BOOK_FROM_CART,
      book
    });

    let state = getState();
    let totalPrice = state.cart.totalPrice;
    let isbns = R.keys(state.cart.books);

    return getBestOffer(totalPrice, isbns)
      .then(
        bestOffer => dispatch(receiveBestOffer(bestOffer)),
        error => {
          dispatch((err.status === 404) ? receiveBestOffer(null) : handleServerError(error));
        }
      )
    ;

  };

};

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
import store from './store'

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
        books => dispatch(reveiveBooks(books))
      )
      .fail(
        error => dispatch(handleServerError(error))
      );
  };

};

export function addBookToCart (book) {

  return dispatch => {

    dispatch({
      type: ADD_BOOK_TO_CART,
      book
    });

    let totalPrice = store.getState().cart.totalPrice;
    let isbns = R.keys(store.getState().cart.books);

    return getBestOffer(totalPrice, isbns)
      .then(
        bestOffer => dispatch(receiveBestOffer(bestOffer))
      )
      .fail(
        error => dispatch(handleServerError(error))
      )
    ;

  };

};

export function removeFromCart (book) {

  return dispatch => {

    dispatch({
      type: REMOVE_BOOK_FROM_CART,
      book
    });

    let totalPrice = store.getState().cart.totalPrice;
    let isbns = R.keys(store.getState().cart.books);

    return getBestOffer(totalPrice, isbns)
      .then(
        bestOffer => dispatch(receiveBestOffer(bestOffer))
      )
      .fail(
        error => {
          dispatch((err.status === 404) ? receiveBestOffer(null) : handleServerError(error));
        }
      )
    ;

  };

};

import {
  RECEIVE_SERVER_ERROR,
  RECEIVE_BEST_OFFER,
  SEARCH_BOOK_START,
  RECEIVE_BOOKS,
  ADD_BOOK_TO_CART,
  REMOVE_BOOK_FROM_CART
} from '../constants/ShopConstants';
import { getBooks, getBestOffer } from '../services/ShopService';

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

export function queryBooks() {

  // return {
  //   type: SEARCH_BOOK_START
  // };

  return getBooks()
    .then(
      (books) => {
        return {
          type: RECEIVE_BOOKS,
          books
        };
      }
    )
    .fail(handleServerError)
  ;

};

export function addBookToCart (book) {

  return {
    type: ADD_BOOK_TO_CART,
    book
  };

  // getBestOffer(CartStore.getTotalPrice(), CartStore.getIsbns())
  //   .then(receiveBestOffer)
  //   .fail((err) => {
  //     if (err.status === 404) {
  //       return receiveBestOffer(null);
  //     }
  //     handleServerError(err);
  //   })
  // ;

};

export function removeFromCart (book) {

  return {
    type: REMOVE_BOOK_FROM_CART,
    book
  };

  // getBestOffer(CartStore.getTotalPrice(), CartStore.getIsbns())
  //   .then(receiveBestOffer)
  //   .fail((err) => {
  //     if (err.status === 404) {
  //       return receiveBestOffer(null);
  //     }
  //     handleServerError(err);
  //   })
  // ;

};

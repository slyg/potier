import
  { FETCH_BOOKS
  , RECEIVE_BOOKS
  , RECEIVE_SERVER_ERROR
  , ADD_BOOK_TO_CART
  , REMOVE_BOOK_FROM_CART
  , RECEIVE_DISCOUNT
  , RESET_DISCOUNT
  } from './actionTypes';

export const fetchBooks =
  () => ({ type: FETCH_BOOKS });

export const serverError =
  error => ({ type: RECEIVE_SERVER_ERROR, error });

export const receiveBooks =
  books => ({ type: RECEIVE_BOOKS, books });

export const addBookToCart =
  book => ({ type: ADD_BOOK_TO_CART, book });

export const removeBookFromCart =
  book => ({ type: REMOVE_BOOK_FROM_CART, book });

export const receiveDiscount =
  discount => ({ type: RECEIVE_DISCOUNT, discount });

export const resetDiscount =
  () => ({ type: RESET_DISCOUNT });

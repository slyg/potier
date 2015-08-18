import ShopConstants      from '../constants/ShopConstants';
import ShopAppDispatcher  from '../dispatcher/ShopAppDispatcher';
import ShopService        from '../services/ShopService';
import CartStore          from '../stores/CartStore';

export function queryBooks() {

  ShopAppDispatcher.dispatch({
    actionType: ShopConstants.SEARCH_BOOK_START
  });

  ShopService.getBooks();

};

export function receiveBooks (books) {

  ShopAppDispatcher.dispatch({
    actionType: ShopConstants.RECEIVE_BOOKS,
    books: books
  });

};

export function receiveBestOffer (bestOffer) {

  ShopAppDispatcher.dispatch({
    actionType: ShopConstants.RECEIVE_BEST_OFFER,
    bestOffer: bestOffer
  });

};

export function receiveServerError (err) {

  ShopAppDispatcher.dispatch({
    actionType: ShopConstants.RECEIVE_SERVER_ERROR,
    error: err
  });

};

export function addBookToCart (book) {

  ShopAppDispatcher.dispatch({
    actionType: ShopConstants.ADD_BOOK_TO_CART,
    book: book
  });

  ShopService.getBestOffer(
    CartStore.getTotalPrice(),
    _.map(CartStore.getItems(), (item) => item.isbn)
  );

};


export function removeFromCart (book) {

  ShopAppDispatcher.dispatch({
    actionType: ShopConstants.REMOVE_BOOK_FROM_CART,
    book: book
  });

  ShopService.getBestOffer(
    CartStore.getTotalPrice(),
    _.map(CartStore.getItems(), (item) => item.isbn)
  );

};

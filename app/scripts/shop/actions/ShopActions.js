var ShopConstants       = require('../constants/ShopConstants'),
    ShopAppDispatcher   = require('../dispatcher/ShopAppDispatcher'),
    ShopService         = require('../services/ShopService'),
    CartStore           = require('../stores/CartStore');

exports.queryForBooks = () => {

  ShopAppDispatcher.dispatch({
    actionType: ShopConstants.SEARCH_BOOK_START
  });

  ShopService.getBooks();

};

exports.receiveBooks = (books) => {

  ShopAppDispatcher.dispatch({
    actionType: ShopConstants.RECEIVE_BOOKS,
    books: books
  });

};

exports.receiveBestOffer = (bestOffer) => {

  ShopAppDispatcher.dispatch({
    actionType: ShopConstants.RECEIVE_BEST_OFFER,
    bestOffer: bestOffer
  });

};

exports.receiveServerError = (err) => {

  ShopAppDispatcher.dispatch({
    actionType: ShopConstants.RECEIVE_SERVER_ERROR,
    error: err
  });

};

exports.addBookToCart = (book) => {

  ShopAppDispatcher.dispatch({
    actionType: ShopConstants.ADD_BOOK_TO_CART,
    book: book
  });

  ShopService.getBestOffer(
    CartStore.getTotalPrice(),
    _.map(CartStore.getItems(), (item) => item.isbn)
  );

};


exports.removeFromCart = (book) => {

  ShopAppDispatcher.dispatch({
    actionType: ShopConstants.REMOVE_BOOK_FROM_CART,
    book: book
  });

  ShopService.getBestOffer(
    CartStore.getTotalPrice(),
    _.map(CartStore.getItems(), (item) => item.isbn)
  );

};

import ShopConstants from '../constants/ShopConstants';
import ShopAppDispatcher            from '../dispatcher/ShopAppDispatcher';
import CartStore                    from '../stores/CartStore';
import { getBooks, getBestOffer }   from '../services/ShopService';

let handleServerError = (err) => {

  ShopAppDispatcher.dispatch({
    actionType: ShopConstants.RECEIVE_SERVER_ERROR,
    error: err
  });

}

let receiveBestOffer = (bestOffer) => {

  ShopAppDispatcher.dispatch({
    actionType: ShopConstants.RECEIVE_BEST_OFFER,
    bestOffer
  });

};

export function queryBooks() {

  ShopAppDispatcher.dispatch({
    actionType: ShopConstants.SEARCH_BOOK_START
  });

  getBooks()
    .then(
      (books) => {
        ShopAppDispatcher.dispatch({
          actionType: ShopConstants.RECEIVE_BOOKS,
          books
        });
      }
    )
    .fail(handleServerError)
  ;

};

export function addBookToCart (book) {

  ShopAppDispatcher.dispatch({
    actionType: ShopConstants.ADD_BOOK_TO_CART,
    book
  });

  getBestOffer(CartStore.getTotalPrice(), CartStore.getIsbns())
    .then(receiveBestOffer)
    .fail((err) => {
      if (err.status === 404) {
        return receiveBestOffer(null);
      }
      handleServerError(err);
    })
  ;

};

export function removeFromCart (book) {

  ShopAppDispatcher.dispatch({
    actionType: ShopConstants.REMOVE_BOOK_FROM_CART,
    book
  });

  getBestOffer(CartStore.getTotalPrice(), CartStore.getIsbns())
    .then(receiveBestOffer)
    .fail((err) => {
      if (err.status === 404) {
        return receiveBestOffer(null);
      }
      handleServerError(err);
    })
  ;

};

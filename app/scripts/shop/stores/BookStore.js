import AppDispatcher from '../dispatcher/ShopAppDispatcher';
import ShopConstants from '../constants/ShopConstants';
import Store         from './Store';

var BookStore = new Store();

AppDispatcher.register((action) => {

  let text;

  switch (action.actionType) {

    case ShopConstants.RECEIVE_BOOKS:
      BookStore.setItems(action.books).emitChange();
      break;

  }

});

export default BookStore;

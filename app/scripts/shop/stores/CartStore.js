import AppDispatcher from '../dispatcher/ShopAppDispatcher';
import ShopConstants from '../constants/ShopConstants';
import Store         from './Store';
import _             from 'lodash';

class CartStoreClass extends Store {

  constructor (...args) {
    super(...args);
  }

  getTotalPrice () {
    return _.reduce(this.items, (total, item) => {
      return (total + item.price*item.amount);
    }, 0);
  }

  createItem (item) {

    let exists = this.items[item.isbn] ? true : false;

    if (exists) {
      this.items[item.isbn].amount++;
    } else {
      this.items[item.isbn] = item;
      this.items[item.isbn].amount = 1;
    }
    return this;
  }

  getIsbns () {
    return _.map(this.getItems(), (item) => item.isbn)
  }

}

var CartStore = new CartStoreClass();

AppDispatcher.register((action) => {

  let text;

  switch (action.actionType) {

    case ShopConstants.ADD_BOOK_TO_CART:
      CartStore.createItem(action.book).emitChange();
      break;

    case ShopConstants.REMOVE_BOOK_FROM_CART:
      CartStore.removeItem(action.book).emitChange();
      break;

  }

});

export default CartStore;

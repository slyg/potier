var AppDispatcher   = require('../dispatcher/ShopAppDispatcher'),
    ShopConstants   = require('../constants/ShopConstants'),
    Store           = require('./Store');

var BookStore = new Store();

AppDispatcher.register((action) => {

  let text;

  switch (action.actionType) {

    case ShopConstants.RECEIVE_BOOKS:
      BookStore.setItems(action.books).emitChange();
      break;

  }

});

module.exports = BookStore;

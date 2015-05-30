var AppDispatcher   = require('../dispatcher/ShopAppDispatcher'),
    ShopConstants   = require('../constants/ShopConstants'),
    Store           = require('./Store');

class BestOfferStoreClass extends Store {

  constructor (...args) {
    super(...args);
    this.items = null;
  }

  reset () {
    this.items = null;
    return this;
  }

  createItem (item) {

    if (item){
      this.items = item;
    } else {
      this.reset();
    }

    return this;
  }

  getItem () {
    return this.items;
  }

}

var BestOfferStore = new BestOfferStoreClass();

AppDispatcher.register((action) => {

  let text;

  switch (action.actionType) {

    case ShopConstants.RECEIVE_BEST_OFFER:
      BestOfferStore.createItem(action.bestOffer).emitChange();
      break;

  }

});

module.exports = BestOfferStore;

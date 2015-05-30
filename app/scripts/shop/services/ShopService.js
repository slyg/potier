var request = window.$,
    ShopActions = require('../actions/ShopActions');

var BOOKS_URL = () => '/books';
var BEST_OFFER_URL = (price, isbns) => {
  let isbnsString = isbns.join(',');
  return `/books/bestoffer/${price}/${isbnsString}`;
};

exports.getBooks = () => {

  request
    .getJSON(BOOKS_URL(), ShopActions.receiveBooks)
    .fail(ShopActions.receiveServerError);

};

exports.getBestOffer = (price, isbns) => {

  request
    .getJSON(
      BEST_OFFER_URL(price, isbns),
      ShopActions.receiveBestOffer
    )
    .fail((err) => {

      if(err.status === 404){
        return ShopActions.receiveBestOffer(null);
      }

      ShopActions.receiveServerError(err);
    });

};

import request from 'jquery';

export function getBooks () {

  return request.getJSON('/books');

};

export function getBestOffer (price, isbns) {

  let generateBestOfferUrl = (price, isbns) => {
    let isbnsString = isbns.join(',');
    return `/books/bestoffer/${price}/${isbnsString}`;
  };

  return request.getJSON(generateBestOfferUrl(price, isbns));

};

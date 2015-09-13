import request from 'jquery';

export function getBooks () {
  return request.getJSON('/books');
};

export function getBestOffer (price, isbns) {
  return request.getJSON(`/books/bestoffer/${price}/${isbns.join(',')}`);
};

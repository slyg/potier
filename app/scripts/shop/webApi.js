export function getBooks () {
  return fetch('/books')
    .then(response => response.json());
};

export function getBestOffer (price, isbns) {
  return fetch(`/books/bestoffer/${price}/${isbns.join(',')}`)
    .then(response => response.json());
};

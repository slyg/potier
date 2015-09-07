export default function scenario(store){

  store.dispatch({
    type: 'RECEIVE_BOOKS',
    books: [{isbn: '1', title: 'A', price: 10}, {isbn: '2', title: 'B', price: 15}]
  });
  store.dispatch({
    type: 'ADD_BOOK_TO_CART',
    book: {isbn: '1', title: 'A', price: 10}
  });
  store.dispatch({
    type: 'ADD_BOOK_TO_CART',
    book: {isbn: '2', title: 'B', price: 15}
  });
  store.dispatch({
    type: 'ADD_BOOK_TO_CART',
    book: {isbn: '2', title: 'B', price: 15}
  });
  store.dispatch({
    type: 'ADD_BOOK_TO_CART',
    book: {isbn: '2', title: 'B', price: 15}
  });
  store.dispatch({
    type: 'REMOVE_BOOK_FROM_CART',
    book: {isbn: '1'}
  });
  store.dispatch({
    type: 'RECEIVE_BEST_OFFER',
    bestOffer: {
      finalPrice: 27.84,
      totalPrice: 29,
      type: 'percentage',
      value: 4
    }
  });
  store.dispatch({
    type: 'RECEIVE_BEST_OFFER',
    bestOffer: {
      finalPrice: 26.1,
      totalPrice: 29,
      type: 'percentage',
      value: 10
    }
  });
  store.dispatch({
    type: 'RECEIVE_BEST_OFFER',
    bestOffer: null
  });

}

import { ADD_BOOK_TO_CART, REMOVE_BOOK_FROM_CART } from '../constants';
import R from 'ramda';

const initialState = {
  books: {},
  totalPrice: 0
};

let countPrice = R.pipe(
  R.values,
  R.reduce((acc, item) => acc+item.price*item.amount, 0)
);

export default function cart(state = initialState, action){

  let item = action.book;
  let newState = R.clone(state);

  switch (action.type) {

    case ADD_BOOK_TO_CART:
    {
      let exists = state.books[item.isbn] ? true : false;
      let books = newState.books;
      if (exists) {
        books[item.isbn].amount++;
      } else {
        books[item.isbn] = item;
        books[item.isbn].amount = 1;
      }
      return Object.assign({}, {
        books,
        totalPrice: countPrice(books)
      });
      break;
    }


    case REMOVE_BOOK_FROM_CART:
    {
      let books = R.omit([item.isbn], newState.books);
      return Object.assign({}, {
        books,
        totalPrice: countPrice(books)
      });
      break;
    }

  }

  return state;

}

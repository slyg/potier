import { ADD_BOOK_TO_CART, REMOVE_BOOK_FROM_CART } from '../constants';
import { pipe, values, reduce, clone, omit } from 'ramda';

const initialState = {
  books: {},
  totalPrice: 0
};

let countPrice = pipe(
  values,
  reduce((acc, item) => acc+item.price*item.amount, 0)
);

export default function cart(state = initialState, action){

  let item = action.book;
  let nextState = clone(state);

  switch (action.type) {

    case ADD_BOOK_TO_CART:
    {
      let exists = state.books[item.isbn] ? true : false;
      let books = nextState.books;
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
      let books = omit([item.isbn], nextState.books);
      return Object.assign({}, {
        books,
        totalPrice: countPrice(books)
      });
      break;
    }

  }

  return state;

}

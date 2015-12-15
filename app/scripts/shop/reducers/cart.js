import { compose, values, reduce, clone, omit } from 'ramda';
import {
  ADD_BOOK_TO_CART,
  REMOVE_BOOK_FROM_CART
} from '../constants';

const initialState = {
  booksPerId : {},
  books: [],
  totalPrice: 0
};

const countPrice = compose(
  reduce((acc, item) => acc+item.price*item.amount, 0),
  values
);

const books = (state, { type, book }) => {

  switch (type) {

    case ADD_BOOK_TO_CART: {

      const exists = state[book.isbn] ? true : false;
      let newState = clone(state);

      newState[book.isbn] = {
        ...book,
        amount: exists ? newState[book.isbn].amount + 1 : 1
      };

      return newState;
      break;
    }

    case REMOVE_BOOK_FROM_CART:
      return omit([book.isbn], state);
      return state;
      break;

  }

  return state;

};

export default function cart(state = initialState, action){

  const updatedBooks = books(state.booksPerId, action);

  return {
    booksPerId  : updatedBooks,
    books       : values(updatedBooks),
    totalPrice  : countPrice(updatedBooks)
  };

}

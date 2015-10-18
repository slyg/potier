import {
  RECEIVE_DISCOUNT,
  RESET_DISCOUNT,
  ADD_BOOK_TO_CART,
  REMOVE_BOOK_FROM_CART
} from '../constants';

let initialState = null;

export default function discount(state = initialState, {type, discount}){

  switch (type) {

    case RECEIVE_DISCOUNT:
    {
      return discount;
      break;
    }

    case ADD_BOOK_TO_CART:
    case REMOVE_BOOK_FROM_CART:
    case RESET_DISCOUNT:
    {
      return initialState;
      break;
    }

  }

  return state;

}

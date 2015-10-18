import {
  RECEIVE_BEST_OFFER,
  RESET_BEST_OFFER,
  ADD_BOOK_TO_CART,
  REMOVE_BOOK_FROM_CART
} from '../constants';

let initialState = null;

export default function discount(state = initialState, {type, bestOffer}){

  switch (type) {

    case RECEIVE_BEST_OFFER:
    {
      return bestOffer;
      break;
    }

    case ADD_BOOK_TO_CART:
    case REMOVE_BOOK_FROM_CART:
    case RESET_BEST_OFFER:
    {
      return initialState;
      break;
    }

  }

  return state;

}

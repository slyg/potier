import {
  RECEIVE_DISCOUNT,
  RESET_DISCOUNT,
  ADD_BOOK_TO_CART,
  REMOVE_BOOK_FROM_CART
} from '../constants';

const initialState = {
  type: null,
  value: null,
  finalPrice: null,
  totalPrice: null
};

export default function discount(state = initialState, {type, discount}){

  switch (type) {

    case RECEIVE_DISCOUNT:
    {
      return {
        ...discount,
        finalPrice : (Math.round((discount.finalPrice + 0.00001) * 100) / 100).toFixed(2)
      };
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

  return {...state};

}

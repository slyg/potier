import {
  RECEIVE_BEST_OFFER,
  RESET_BEST_OFFER
} from '../constants';

let initialState = null;

export default function discount(state = initialState, {type, bestOffer}){

  switch (type) {

    case RECEIVE_BEST_OFFER:
    {
      return bestOffer;
      break;
    }

    case RESET_BEST_OFFER:
    {
      return initialState;
      break;
    }

  }

  return state;

}

import { RECEIVE_BEST_OFFER } from '../constants';

export default function discount(state = null, {type, bestOffer}){

  switch (type) {

    case RECEIVE_BEST_OFFER:
    {
      return bestOffer;
      break;
    }

  }

  return state;

}

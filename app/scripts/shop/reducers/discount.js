import { RECEIVE_BEST_OFFER } from '../constants';

export default function discount(state = null, action){

  switch (action.type) {

    case RECEIVE_BEST_OFFER:
    {
      return action.bestOffer;
      break;
    }

  }

  return state;

}

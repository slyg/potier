import {
  RECEIVE_BOOKS
} from '../constants';

export default function books(state = [], {type, books}){

  switch (type) {

    case RECEIVE_BOOKS:
    {
      return [...state, ...books];
      break;
    }

  }

  return state;

}

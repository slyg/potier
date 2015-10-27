import { reduce, merge } from 'ramda';
import {
  RECEIVE_BOOKS
} from '../constants';

export default function books(state = {}, {type, books}){

  switch (type) {

    case RECEIVE_BOOKS:
    {
      return Object.assign({}, state, reduce((acc, value) => {
        let obj = {};
        obj[value.isbn] = value;
        return merge(acc, obj);
      }, {})(books));
      break;
    }

  }

  return state;

}

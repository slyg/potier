import { RECEIVE_BOOKS } from '../constants';
import { reduce, merge } from 'ramda';

export default function books(state = {}, {type, books}){

  switch (type) {

    case RECEIVE_BOOKS:
    {
      return Object.assign({}, state, reduce((acc, value) => {
        var obj = {};
        obj[value.isbn] = value;
        return merge(acc, obj);
      }, {})(books));
      break;
    }

  }

  return state;

}

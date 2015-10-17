import { RECEIVE_BOOKS } from '../constants';
import { reduce, merge } from 'ramda';

export default function books(state = {}, action){

  switch (action.type) {

    case RECEIVE_BOOKS:
      return Object.assign({}, state, reduce((acc, value) => {
        var obj = {};
        obj[value.isbn] = value;
        return merge(acc, obj);
      }, {})(action.books));

      break;

  }

  return state;

}

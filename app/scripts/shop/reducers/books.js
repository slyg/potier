import { RECEIVE_BOOKS } from '../constants/ShopConstants';
import R from 'ramda';

export default function books(state = {}, action){

  switch (action.type) {

    case RECEIVE_BOOKS:
      return Object.assign({}, state, R.reduce((acc, value) => {
        var obj = {};
        obj[value.isbn] = value;
        return R.merge(acc, obj);
      }, {})(action.books));

      break;

  }

  return state;

}

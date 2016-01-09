import { take, put, call } from 'redux-saga';
import { FETCH_BOOKS } from '../actionTypes';
import { getBooks } from '../webApi';
import * as actions from '../actionCreators';

export default function* fetchBooks (){
  while( yield take(FETCH_BOOKS) ) {
    try {
      const books = yield call(getBooks);
      yield put(actions.receiveBooks(books));
    } catch (e) {
      yield put(actions.serverError(e));
    }
 }
};

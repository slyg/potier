import { getBooks } from '../webApi';
import {
  RECEIVE_SERVER_ERROR,
  SEARCH_BOOK_START,
  RECEIVE_BOOKS
} from '../constants';

export default function () {

  return dispatch => {

    dispatch({ type: SEARCH_BOOK_START });

    return getBooks().then(
      books => dispatch({ type: RECEIVE_BOOKS, books }),
      error => dispatch({ type: RECEIVE_SERVER_ERROR, error })
    );
    
  };

};

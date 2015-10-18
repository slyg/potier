import { getBooks } from '../webApi';
import {
  RECEIVE_SERVER_ERROR,
  SEARCH_BOOK_START,
  RECEIVE_BOOKS
} from '../constants';

export default function () {

  return async function (dispatch) {

    dispatch({ type: SEARCH_BOOK_START });

    try {

      let books = await getBooks();
      dispatch({ type: RECEIVE_BOOKS, books });

    } catch(error) {

      dispatch({ type: RECEIVE_SERVER_ERROR, error });

    }

  };

};

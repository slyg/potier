import { getBooks } from '../webApi';
import {
  RECEIVE_SERVER_ERROR,
  RECEIVE_BOOKS
} from '../constants';

export default function () {

  return async function (dispatch) {

    try {

      let books = await getBooks();
      dispatch({ type: RECEIVE_BOOKS, books });

    } catch(error) {

      dispatch({ type: RECEIVE_SERVER_ERROR, error });

    }

  };

};

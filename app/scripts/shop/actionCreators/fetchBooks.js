import { getBooks } from '../webApi';
import {
  RECEIVE_SERVER_ERROR,
  RECEIVE_BOOKS
} from '../actionTypes';

export default function () {

  return async function (dispatch) {

    try {

      const books = await getBooks();
      dispatch({ type: RECEIVE_BOOKS, books });

    } catch(error) {

      dispatch({ type: RECEIVE_SERVER_ERROR, error });

    }

  };

};

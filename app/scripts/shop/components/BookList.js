import React          from 'react';
import { PropTypes }  from 'react';
import { map }        from 'ramda';
import BookItem       from './BookItem';

const Booklist = ({ books, addBookToCart }) => {

  if (books.length < 1) {
    return <p className='txtcenter ptl'>Loading...</p>;
  }

  return (
    <ul className='ul grid-2-small-1'>
      {map( book =>
        <li key={book.isbn}>
          <BookItem
            book={book}
            onAddToCart={addBookToCart} />
        </li>
      )(books)}
    </ul>
  );

};

Booklist.propTypes = {
	books: PropTypes.array.isRequired,
	addBookToCart: PropTypes.func.isRequired
};

export default Booklist;

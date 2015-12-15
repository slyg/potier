import React          from 'react';
import { PropTypes }  from 'react';
import { map }        from 'ramda';
import Book           from './Book';

const Booklist = ({ books, addBookToCart }) => {

  if (books.length < 1) {
    return <p className='txtcenter ptl'>Loading...</p>;
  }

  return (
    <ul className='ul grid-2-small-1'>
      {map( item =>
        <li key={item.isbn}>
          <Book
            item={item}
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

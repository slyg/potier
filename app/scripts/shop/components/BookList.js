import BookItem from './BookItem';
import React from 'react';
import { PropTypes } from 'react';
import { values, map, compose } from 'ramda';

const BookList = ({ items, onAddToCart }) => {

  if (items.length < 1) {
    return (
      /* jshint ignore:start */
      <p className='txtcenter ptl'>Loading...</p>
      /* jshint ignore:end */
    );
  }

  const bookItems = compose(
    map( item =>
      /* jshint ignore:start */
      <li key={item.isbn}>
        <BookItem item={item} onAddToCart={onAddToCart} />
      </li>
      /* jshint ignore:end */
    ),
    values
  )(items);

  return (
    /* jshint ignore:start */
    <ul className='ul grid-2-small-1'>{bookItems}</ul>
    /* jshint ignore:end */
  );

};

BookList.propTypes = {
  items: PropTypes.object.isRequired,
  onAddToCart: PropTypes.func.isRequired
};

export default BookList;

import BookItem from './BookItem';
import React from 'react';
import { PropTypes } from 'react';
import { values, map, compose } from 'ramda';
import ReactCSSTransitionGroup from 'react-addons-transition-group';

let BookList = ({ items, onAddToCart }) => {

  if (items.length < 1) {
    return (
      /* jshint ignore:start */
      <p className='tac ptl'>Loading...</p>
      /* jshint ignore:end */
    );
  }

  let bookItems = compose(
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
    <ReactCSSTransitionGroup transitionName='default_transition' transitionAppear={true}>
      <ul className='ul grid-2'>{bookItems}</ul>
    </ReactCSSTransitionGroup>
    /* jshint ignore:end */
  );

};

BookList.propTypes = {
  items: PropTypes.object.isRequired,
  onAddToCart: PropTypes.func.isRequired
};

export default BookList;

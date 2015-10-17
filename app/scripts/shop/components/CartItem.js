import React from 'react';
import { PropTypes } from 'react';

let CartItem = ({ item, onRemoveBookFromCart }) =>
  /* jshint ignore:start */
  <div className='grid-4-1'>
    <div className='title' onClick={() => onRemoveBookFromCart(item)}>{item.title}</div>
    <div className='tar price'>{item.amount} × {item.price}€</div>
  </div>
  /* jshint ignore:end */
;

CartItem.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired
  }).isRequired,
  onRemoveBookFromCart: PropTypes.func.isRequired
};

export default CartItem;

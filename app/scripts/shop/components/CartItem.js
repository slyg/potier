import React from 'react';
import { PropTypes } from 'react';

let CartItem = ({ item, onRemoveFromCart }) =>
  /* jshint ignore:start */
  <div className='grid-4-1'>
    <div className='title' onClick={() => onRemoveFromCart(item)}>{item.title}</div>
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
  onRemoveFromCart: PropTypes.func.isRequired
};

export default CartItem;

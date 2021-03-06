import React from 'react';
import { PropTypes } from 'react';

const CartItem = ({ item, onRemoveBookFromCart }) =>
  <div className='grid-4-1'>
    <div className='title' onClick={() => onRemoveBookFromCart(item)}>{item.title}</div>
    <div className='txtright price'>{item.amount} × {item.price}€</div>
  </div>
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

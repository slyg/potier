import CartItem from './CartItem';
import React from 'react';
import { PropTypes } from 'react';
import { values, map, pipe } from 'ramda';

const Cart = ({ cart, onRemoveBookFromCart }) => {

  const cartItems = pipe(
    values,
    map( item =>
      <li key={item.isbn}>
        <CartItem item={item} onRemoveBookFromCart={onRemoveBookFromCart} />
      </li>
    )
  )(cart.books);

  return (
    <div>
      <h2>Your cart</h2>
      <ul>{cartItems}</ul>
      <div className='txtright total'>Total: {cart.totalPrice}€</div>
    </div>
  );

};

Cart.propTypes = {
  cart: PropTypes.shape({
    totalPrice: PropTypes.number.isRequired,
    books: PropTypes.object.isRequired
  }).isRequired,
  onRemoveBookFromCart: PropTypes.func.isRequired
};

export default Cart;

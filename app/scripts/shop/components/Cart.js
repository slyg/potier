import CartItem from './CartItem';
import React from 'react';
import { PropTypes } from 'react';
import { values, map, pipe } from 'ramda';

const Cart = ({ cart, onRemoveBookFromCart }) => {

  const cartItems = pipe(
    values,
    map( item =>
      /* jshint ignore:start */
      <li key={item.isbn}>
        <CartItem item={item} onRemoveBookFromCart={onRemoveBookFromCart} />
      </li>
      /* jshint ignore:end */
    )
  )(cart.books);

  return (
    /* jshint ignore:start */
    <div>
      <h2>Your cart</h2>
      <ul>{cartItems}</ul>
      <div className='txtright total'>Total: {cart.totalPrice}€</div>
    </div>
    /* jshint ignore:end */
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

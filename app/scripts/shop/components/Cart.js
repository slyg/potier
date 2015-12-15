import React          from 'react';
import { PropTypes }  from 'react';
import { map }        from 'ramda';

import CartItem       from './CartItem';

const Cart = ({ books, totalPrice, onRemoveBookFromCart }) => {
  return (
    <div>
      <h2>Your cart</h2>
      <ul>
        {map( item =>
          <li key={item.isbn}>
            <CartItem item={item} onRemoveBookFromCart={onRemoveBookFromCart} />
          </li>
        )(books)}
      </ul>
      <div className='txtright total'>Total: {totalPrice}€</div>
    </div>
  );
};

Cart.propTypes = {
  totalPrice: PropTypes.number.isRequired,
  books: PropTypes.array.isRequired,
  onRemoveBookFromCart: PropTypes.func.isRequired
};

export default Cart;

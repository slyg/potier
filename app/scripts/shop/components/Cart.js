import CartItem from './CartItem';
import React from 'react';
import { PropTypes } from 'react';
import { values, map, pipe } from 'ramda';
import ReactCSSTransitionGroup from 'react-addons-transition-group';

let Cart = ({ cart, onRemoveFromCart }) => {

  let cartItems = pipe(
    values,
    map( item =>
      /* jshint ignore:start */
      <li key={item.isbn}>
        <CartItem item={item} onRemoveFromCart={onRemoveFromCart} />
      </li>
      /* jshint ignore:end */
    )
  )(cart.books);

  return (
    /* jshint ignore:start */
    <ReactCSSTransitionGroup transitionName='default_transition' transitionAppear={true}>
    <div>
      <h2>Your cart</h2>
      <ul>
        {cartItems}
      </ul>
      <div className='tar total'>Total: {cart.totalPrice}€</div>
    </div>
    </ReactCSSTransitionGroup>
    /* jshint ignore:end */
  );

};

Cart.propTypes = {
  cart: PropTypes.shape({
    totalPrice: PropTypes.number.isRequired,
    books: PropTypes.object.isRequired
  }).isRequired,
  onRemoveFromCart: PropTypes.func.isRequired
};

export default Cart;

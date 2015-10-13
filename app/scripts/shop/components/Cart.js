import CartItem from './CartItem';
import React from 'react/addons';
import { values, map, pipe } from 'ramda';

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

export default React.createClass({

  propTypes: {
    cart: React.PropTypes.shape({
      totalPrice: React.PropTypes.number.isRequired,
      books: React.PropTypes.object.isRequired
    }).isRequired,
    onRemoveFromCart: React.PropTypes.func.isRequired
  },

  render: function(){

    let cartItems = pipe(
      values,
      map(
        (item) => {
          return (
            /* jshint ignore:start */
            <li key={item.isbn}>
              <CartItem item={item} onRemoveFromCart={this.props.onRemoveFromCart} />
            </li>
            /* jshint ignore:end */
          );
        }
      )
    )(this.props.cart.books);

    /* jshint ignore:start */
    return (
      <ReactCSSTransitionGroup transitionName='default_transition' transitionAppear={true}>
      <div>
        <h2>Votre panier</h2>
        <ul>
          {cartItems}
        </ul>
        <div className='tar total'>Total: {this.props.cart.totalPrice}€</div>
      </div>
      </ReactCSSTransitionGroup>
    );
    /* jshint ignore:end */

  }

});

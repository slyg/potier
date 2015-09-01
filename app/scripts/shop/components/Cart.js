import CartItem from './CartItem';
import React from 'react/addons';
import { values, map, pipe } from 'ramda';

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

export default class extends React.Component {

  render(){

    let cartItems = pipe(
      values,
      map(
        (item) => {
          return (
            /* jshint ignore:start */
            <li key={item.isbn}>
              <CartItem item={item} />
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

}

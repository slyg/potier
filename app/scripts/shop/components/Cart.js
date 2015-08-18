import CartItem from './CartItem';

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup,
    _ = window._;

export default class extends React.Component {

  render(){

    var cartItems = _.map(this.props.cart.books, function(item) {
      /* jshint ignore:start */
      return (
        <li key={item.isbn}>
          <CartItem item={item} />
        </li>
      );
      /* jshint ignore:end */
    });

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

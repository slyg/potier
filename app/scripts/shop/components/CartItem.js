var React = window.React,
    ShopActions = require('../actions/ShopActions');

class CartItem extends React.Component {

  constructor(...args) {
    super(...args);
    this._onRemoveFromCart = this._onRemoveFromCart.bind(this);
  }

  _onRemoveFromCart() {
    ShopActions.removeFromCart(this.props.item);
  }

  render(){

    var item = this.props.item;

    /* jshint ignore:start */
    return (
      <div className='grid-4-1'>
        <div className='title' onClick={this._onRemoveFromCart}>{item.title}</div>
        <div className='tar price'>{item.amount} × {item.price}€</div>
      </div>
    );
    /* jshint ignore:end */

  }

}

module.exports = CartItem;

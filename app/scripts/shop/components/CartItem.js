import { removeFromCart } from '../actions/ShopActions';

export default class extends React.Component {

  constructor(...args) {
    super(...args);
    this._onRemoveFromCart = this._onRemoveFromCart.bind(this);
  }

  _onRemoveFromCart() {
    removeFromCart(this.props.item);
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

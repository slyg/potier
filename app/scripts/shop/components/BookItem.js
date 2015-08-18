import { addBookToCart } from '../actions/ShopActions';

export default class extends React.Component {

  constructor(...args) {
    super(...args);
    this._onAddToCart = this._onAddToCart.bind(this);
  }

  _onAddToCart() {
    addBookToCart(this.props.item);
  }

  render(){

    var item = this.props.item;

    /* jshint ignore:start */
    return (
      <article className='book-item mbs grid-2'>
        <div>
          <img className='book-cover' src={item.cover} />
        </div>
        <div>
          <h3>{item.title}</h3>
          <p className='pbs price'>{item.price}€</p>
          <p>
            <button onClick={this._onAddToCart} type='submit' className='btn btn-secondary'>Ajouter au panier</button>
          </p>
        </div>
      </article>
    );
    /* jshint ignore:end */

  }

}

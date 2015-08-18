import BookList         from './BookList';
import Cart             from './Cart';
import PayBox           from './PayBox';
import { queryBooks }   from '../actions/ShopActions';
import BookStore        from '../stores/BookStore';
import CartStore        from '../stores/CartStore';
import BestOfferStore   from '../stores/BestOfferStore';

export default class extends React.Component {

  constructor(...args) {

    super(...args);

    this.state = {
      books: [],
      cart: { totalPrice: 0, books: [] },
      discount : null
    };

    this._onBooksChange = this._onBooksChange.bind(this);

    queryBooks();

  }

  componentDidMount () {
    _.each([BookStore, CartStore, BestOfferStore], (store) => {
      store.addChangeListener(this._onBooksChange);
    }.bind(this));
  }

  componentWillUnmount () {
    _.each([BookStore, CartStore, BestOfferStore], (store) => {
      store.removeChangeListener(this._onBooksChange);
    }.bind(this));
  }

  _onBooksChange () {
    this.setState({
      books: BookStore.getItems(),
      cart : {
        totalPrice: CartStore.getTotalPrice(),
        books: CartStore.getItems()
      },
      discount : BestOfferStore.getItem()
    });
  }

  render(){

    let cart = (
      /* jshint ignore:start */
      <div></div>
      /* jshint ignore:end */
    );

    // Display cart content only when it is filled-in
    if (this.state.cart.totalPrice > 0){
      /* jshint ignore:start */
      cart = (
        <div>

          <div className="cart pbl">
            <Cart cart={this.state.cart} />
          </div>

          <div className="offer pbl">
            <PayBox discount={this.state.discount} cart={this.state.cart} />
          </div>

        </div>
      );
      /* jshint ignore:end */
    }

    /* jshint ignore:start */
    return (
      <div className="grid-2-1">

        <div className="book-list">
          <BookList items={this.state.books} />
        </div>

        <div className="cart-box">
          <div className="">{cart}</div>
        </div>

      </div>
    );
    /* jshint ignore:end */

  }

}

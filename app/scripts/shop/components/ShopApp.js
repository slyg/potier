var React = window.React,
    _ = window._,
    BookList = require('./BookList'),
    Cart = require('./Cart'),
    PayBox = require('./PayBox'),
    BookStore = require('../stores/BookStore'),
    CartStore = require('../stores/CartStore'),
    BestOfferStore = require('../stores/BestOfferStore'),
    ShopActions = require('../actions/ShopActions');

class ShopApp extends React.Component {

  constructor(...args) {

    super(...args);

    this.state = {
      books: [],
      cart: { totalPrice: 0, books: [] },
      discount : null
    };

    this._onBooksChange = this._onBooksChange.bind(this);

    ShopActions.queryForBooks();

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

    var cart = (
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

        <div className="cart-box">{cart}</div>

      </div>
    );
    /* jshint ignore:end */

  }

}

module.exports = ShopApp;

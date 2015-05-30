var React = window.React,
    BookList = require('./BookList'),
    Cart = require('./Cart'),
    PayBox = require('./PayBox'),
    BookStore = require('../stores/BookStore'),
    CartStore = require('../stores/CartStore'),
    BestOfferStore = require('../stores/BestOfferStore'),
    ShopActions = require('../actions/ShopActions');

var BOOKS_FIXTURE = require('../fixtures/books');
var BOOKS_IN_CART_FIXTURE = require('../fixtures/booksInCart');

class ShopApp extends React.Component {

  constructor(...args) {

    super(...args);

    this.state = {
      books: [],
      cart: {
        totalPrice: 0,
        books: []
      },
      discount : null
    };

    this._onBooksChange = this._onBooksChange.bind(this);

    ShopActions.queryForBooks();

  }

  componentDidMount () {
    BookStore.addChangeListener(this._onBooksChange);
    CartStore.addChangeListener(this._onBooksChange);
    BestOfferStore.addChangeListener(this._onBooksChange);
  }

  componentWillUnmount () {
    BookStore.removeChangeListener(this._onBooksChange);
    CartStore.removeChangeListener(this._onBooksChange);
    BestOfferStore.removeChangeListener(this._onBooksChange);
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

import React from 'react/addons';
import BookList         from './BookList';
import Cart             from './Cart';
import PayBox           from './PayBox';
import { queryBooks, addBookToCart }   from '../actions/ShopActionsCreator';
import BookStore        from '../stores/BookStore';
import CartStore        from '../stores/CartStore';
import BestOfferStore   from '../stores/BestOfferStore';
import R                from 'ramda';

export default class extends React.Component {

  constructor(...args) {

    super(...args);

    this.state = {
      books: [],
      cart: { totalPrice: 0, books: [] },
      discount : null
    };

    this.onBooksChange = this.onBooksChange.bind(this);

    queryBooks();

  }

  componentDidMount () {
    R.forEach((store) => {
      store.addChangeListener(this.onBooksChange);
    }.bind(this), [BookStore, CartStore, BestOfferStore]);
  }

  componentWillUnmount () {
    R.forEach((store) => {
      store.removeChangeListener(this.onBooksChange);
    }.bind(this), [BookStore, CartStore, BestOfferStore]);
  }

  onBooksChange () {
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
          <BookList items={this.state.books} onAddToCart={(item) => addBookToCart(item)} />
        </div>

        <div className="cart-box">
          <div className="">{cart}</div>
        </div>

      </div>
    );
    /* jshint ignore:end */

  }

}

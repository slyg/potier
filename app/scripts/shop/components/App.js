import React       from 'react/addons';
import { connect } from 'react-redux';
import R           from 'ramda';

import BookList    from './BookList';
import Cart        from './Cart';
import PayBox      from './PayBox';
import { queryBooks, addBookToCart, removeFromCart } from '../actionCreators';

let app = React.createClass({

  componentDidMount: function(){
    let { dispatch } = this.props;
    dispatch(queryBooks())
  },

  render: function(){

    let { dispatch } = this.props;

    /* jshint ignore:start */
    let cart = (
      <div></div>
    );

    // Display cart content only when it is filled-in
    if (this.props.cart.totalPrice > 0){
      cart = (
        <div>

          <div className="cart pbl">
            <Cart cart={this.props.cart} onRemoveFromCart={(item) => dispatch(removeFromCart(item))} />
          </div>

          <div className="offer pbl">
            <PayBox discount={this.props.discount} cart={this.props.cart} />
          </div>

        </div>
      );
    }

    return (
      <div className="grid-2-1">

        <div className="book-list">
          <BookList items={this.props.books} onAddToCart={(item) => dispatch(addBookToCart(item))} />
        </div>

        <div className="cart-box">
          <div className="">{cart}</div>
        </div>

      </div>
    );
    /* jshint ignore:end */

  }

});

// Select root properties of state used by app
function select({books, cart, discount}) {
  return {books, cart, discount};
}

export default connect(select)(app);

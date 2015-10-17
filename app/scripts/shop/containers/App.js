import React       from 'react';
import { connect } from 'react-redux';
import R           from 'ramda';

import BookList    from '../components/BookList';
import Cart        from '../components/Cart';
import PayBox      from '../components/PayBox';
import { queryBooks, addBookToCart, removeFromCart } from '../actionCreators';

let app = React.createClass({

  componentDidMount: function(){
    let { dispatch } = this.props;
    dispatch(queryBooks());
  },

  render: function(){

    let { dispatch, cart, discount, books } = this.props;

    /* jshint ignore:start */
    let cartDom = (
      <div></div>
    );

    // Display cart content only when it is filled-in
    if (cart.totalPrice > 0){
      cartDom = (
        <div>
          <div className='cart pbl'>
            <Cart
              cart={cart}
              onRemoveFromCart={ item => dispatch(removeFromCart(item)) }
            />
          </div>
          <div className='offer pbl'>
            <PayBox discount={discount} />
          </div>
        </div>
      );
    }

    return (
      <div className='grid-2-1'>
        <div className='book-list'>
          <BookList
            items={books}
            onAddToCart={ item => dispatch(addBookToCart(item)) }
          />
        </div>
        <div className='cart-box'>{cartDom}</div>
      </div>
    );
    /* jshint ignore:end */

  }

});

// Select root properties of state used by app
let select = ({books, cart, discount}) => ({books, cart, discount});

export default connect(select)(app);

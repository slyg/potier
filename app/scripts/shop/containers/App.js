import React              from 'react';
import { connect }        from 'react-redux';

import BookList           from '../components/BookList';
import Cart               from '../components/Cart';
import PayBox             from '../components/PayBox';

import fetchBooks         from '../actionCreators/fetchBooks';
import addBookToCart      from '../actionCreators/addBookToCart';
import removeBookFromCart from '../actionCreators/removeBookFromCart';

const app = React.createClass({

  componentDidMount: function(){
    const { dispatch } = this.props;
    dispatch(fetchBooks());
  },

  render: function(){

    const { dispatch, cart, discount, books } = this.props;
    const hasCart = (cart.totalPrice > 0);
    let cartDom;

    // Display cart content only when it is filled-in
    if (hasCart){
      cartDom = (
        /* jshint ignore:start */
        <div>
          <div className='cart pbm'>
            <Cart
              cart={cart}
              onRemoveBookFromCart={ item => dispatch(removeBookFromCart(item)) }
            />
          </div>
          <div className='offer pbm'>
            <PayBox discount={discount} />
          </div>
        </div>
        /* jshint ignore:end */
      );
    }

    return (
      /* jshint ignore:start */
      <div className={hasCart ? 'grid-2-1' : 'grid-4-1'}>
        <div className='book-list'>
          <BookList
            items={books}
            onAddToCart={ item => dispatch(addBookToCart(item)) }
          />
        </div>
        <div className='cart-box'>{cartDom}</div>
      </div>
      /* jshint ignore:end */
    );

  }

});

// Select root properties of state used by app
const select = ({books, cart, discount}) => ({books, cart, discount});

export default connect(select)(app);

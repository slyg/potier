import React              from 'react';
import { connect }        from 'react-redux';

import BookList           from '../containers/BookList';
import Cart               from '../components/Cart';
import PayBox             from '../components/PayBox';

import removeBookFromCart from '../actionCreators/removeBookFromCart';

const app = React.createClass({

  render: function(){

    const { dispatch, cart, discount } = this.props;
    const hasCart = (cart.totalPrice > 0);
    let cartDom;

    // Display cart content only when it is filled-in
    if (hasCart){
      cartDom = (
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
      );
    }

    return (
      <div className={hasCart ? 'grid-2-1' : 'grid-4-1'}>
        <div className='book-list'>
          <BookList />
        </div>
        <div className='cart-box'>{cartDom}</div>
      </div>
    );

  }

});

// Select root properties of state used by app
const select = ({cart, discount}) => ({cart, discount});

export default connect(select)(app);

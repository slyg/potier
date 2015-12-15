import React              from 'react';
import { connect }        from 'react-redux';

import BookList           from '../containers/BookList';
import Side               from '../containers/Side';

const app = React.createClass({

  render: function(){

    const { hasCart } = this.props;

    return (
      <div className={hasCart ? 'grid-2-1' : 'grid-4-1'}>
        <div className='book-list'>
          <BookList />
        </div>
        <div className='cart-box'>
          <Side />
        </div>
      </div>
    );

  }

});

// Select root properties of state used by app
const select = ({cart}) => ({
  hasCart: (cart.totalPrice > 0)
});

export default connect(select)(app);

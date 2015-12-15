import React              from 'react';
import { connect }        from 'react-redux';

import BookListContainer  from '../containers/BookListContainer';
import CartContainer      from '../containers/CartContainer';
import PayBoxContainer    from '../containers/PayBoxContainer';

const App = React.createClass({

  render: function(){

    const { hasCart } = this.props;

    return (
      <div className={hasCart ? 'grid-2-1' : 'grid-4-1'}>
        <div className='book-list'>
          <BookListContainer />
        </div>
        <div className='cart-box'>
          {hasCart ? (
            <div>
              <div className='cart pbm'>
                <CartContainer />
              </div>
              <div className='offer pbm'>
                <PayBoxContainer />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );

  }

});

const mapStateToProps = ({cart}) => ({
  hasCart: (cart.totalPrice > 0)
});

export default connect(mapStateToProps)(App);

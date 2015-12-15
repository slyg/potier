import React                  from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import { values }             from 'ramda';

import Cart                   from '../components/Cart';
import PayBox                 from '../components/PayBox';

import removeBookFromCart     from '../actionCreators/removeBookFromCart';

const Side = React.createClass({

  render: function(){

    const { books } = this.props;

    // Display cart content only when it is filled-in
    if (books.length > 0){
      return (
        <div>
          <div className='cart pbm'>
            <Cart {...this.props} />
          </div>
          <div className='offer pbm'>
            <PayBox {...this.props} />
          </div>
        </div>
      );
    }

    return null;

  }

});

// Select root properties of state used by app
const mapStateToProps = ({cart, discount}) => ({
  books : cart.books,
  totalPrice : cart.totalPrice,
  discount
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
  onRemoveBookFromCart: removeBookFromCart
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Side);

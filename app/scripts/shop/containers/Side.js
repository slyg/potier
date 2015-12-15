import React                  from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';

import Cart                   from '../components/Cart';
import PayBox                 from '../components/PayBox';

import removeBookFromCart     from '../actionCreators/removeBookFromCart';

const Side = React.createClass({

  render: function(){

    const { cart, discount, removeBookFromCart } = this.props;

    // Display cart content only when it is filled-in
    if (cart.totalPrice > 0){
      return (
        <div>
          <div className='cart pbm'>
            <Cart
              cart={cart}
              onRemoveBookFromCart={ removeBookFromCart }
            />
          </div>
          <div className='offer pbm'>
            <PayBox discount={discount} />
          </div>
        </div>
      );
    }

    return null;

  }

});

// Select root properties of state used by app
const mapStateToProps = ({cart, discount}) => ({cart, discount});
const mapDispatchToProps = (dispatch) => bindActionCreators({ removeBookFromCart }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Side);

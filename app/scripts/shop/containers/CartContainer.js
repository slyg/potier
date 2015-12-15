import React                  from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import Cart                   from '../components/Cart';
import removeBookFromCart     from '../actionCreators/removeBookFromCart';

const CartContainer = React.createClass({
  render: function(){
    return <Cart {...this.props} />;
  }
});

const mapStateToProps = ({cart}) => ({...cart});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  onRemoveBookFromCart: removeBookFromCart
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CartContainer);

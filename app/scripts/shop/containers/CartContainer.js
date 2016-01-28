import React                  from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import Cart                   from '../components/Cart';
import { removeBookFromCart } from '../actionCreators';

const CartContainer = (props) => <Cart {...props} />;

const mapStateToProps = ({cart}) => ({...cart});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  onRemoveBookFromCart: removeBookFromCart
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CartContainer);

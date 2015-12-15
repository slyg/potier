import React                  from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import { map }                from 'ramda';

import BookList               from '../components/BookList';

import addBookToCart          from '../actionCreators/addBookToCart';
import fetchBooks             from '../actionCreators/fetchBooks';

const BooklistContainer = React.createClass({

  componentDidMount: function(){
    this.props.fetchBooks();
  },

  render : function(){
    return <BookList {...this.props} />;
  }

});

const mapStateToProps = ({books}) => ({ books });

const mapDispatchToProps = (dispatch) => bindActionCreators({
  addBookToCart,
  fetchBooks
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BooklistContainer);

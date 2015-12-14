import React              from 'react';
import { connect }        from 'react-redux';
import { keys, values, map, compose } from 'ramda';

import BookItem from '../components/BookItem';

import addBookToCart      from '../actionCreators/addBookToCart';
import fetchBooks         from '../actionCreators/fetchBooks';

const Booklist = React.createClass({

  componentDidMount: function(){
    const { dispatch } = this.props;
    dispatch(fetchBooks());
  },

  render : function(){

    const { books, dispatch } = this.props;
    const booksArray = values(books);

    if (booksArray.length < 1) {
      return (
        /* jshint ignore:start */
        <p className='txtcenter ptl'>Loading...</p>
        /* jshint ignore:end */
      );
    }

    const bookItems = map( item =>
      /* jshint ignore:start */
      <li key={item.isbn}>
        <BookItem item={item} onAddToCart={() => dispatch(addBookToCart(item))} />
      </li>
      /* jshint ignore:end */
    )(booksArray);

    return (
      /* jshint ignore:start */
      <ul className='ul grid-2-small-1'>{bookItems}</ul>
      /* jshint ignore:end */
    );

  }

});

const select = ({books}) => ({books});

export default connect(select)(Booklist);

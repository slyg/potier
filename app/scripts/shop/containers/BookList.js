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

    const { booksArray, dispatch } = this.props;

    if (booksArray.length < 1) {
      return <p className='txtcenter ptl'>Loading...</p>;
    }

    const bookItems = map( item =>
      <li key={item.isbn}>
        <BookItem item={item} onAddToCart={() => dispatch(addBookToCart(item))} />
      </li>
    )(booksArray);

    return <ul className='ul grid-2-small-1'>{bookItems}</ul>;

  }

});

const mapStateToProps = ({books}) => ({
  booksArray: values(books)
});

export default connect(mapStateToProps)(Booklist);

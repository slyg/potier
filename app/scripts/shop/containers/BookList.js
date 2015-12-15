import React                  from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import { map }                from 'ramda';

import Book                   from '../components/Book';

import addBookToCart          from '../actionCreators/addBookToCart';
import fetchBooks             from '../actionCreators/fetchBooks';

const Booklist = React.createClass({

  componentDidMount: function(){
    this.props.fetchBooks();
  },

  render : function(){

    const { books, addBookToCart } = this.props;

    if (books.length < 1) {
      return <p className='txtcenter ptl'>Loading...</p>;
    }

    return (
      <ul className='ul grid-2-small-1'>
        {map( item =>
          <li key={item.isbn}>
            <Book
              item={item}
              onAddToCart={addBookToCart} />
          </li>
        )(books)}
      </ul>
    );

  }

});

const mapStateToProps = ({books}) => ({ books });

const mapDispatchToProps = (dispatch) => bindActionCreators({
  addBookToCart,
  fetchBooks
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Booklist);

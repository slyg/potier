import React from 'react';
import { PropTypes } from 'react';

const BookItem = ({ book, onAddToCart }) =>
  <article className='book-item mbs grid-2-3'>
    <div>
      <img className='book-cover' src={book.cover} />
    </div>
    <div>
      <h3>{book.title}</h3>
      <p className='pbs price'>{book.price}€</p>
      <p>
        <button onClick={() => onAddToCart(book)} type='submit' className='btn btn-secondary'>Add to cart</button>
      </p>
    </div>
  </article>
;

BookItem.propTypes = {
  book: PropTypes.shape({
    cover: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
  }),
  onAddToCart: PropTypes.func.isRequired
};

export default BookItem;

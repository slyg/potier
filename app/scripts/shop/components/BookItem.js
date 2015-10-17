import React from 'react';
import { PropTypes } from 'react';

let BookItem = ({ item, onAddToCart }) => {

  /* jshint ignore:start */
  return (
    <article className='book-item mbs grid-2'>
      <div>
        <img className='book-cover' src={item.cover} />
      </div>
      <div>
        <h3>{item.title}</h3>
        <p className='pbs price'>{item.price}€</p>
        <p>
          <button onClick={() => onAddToCart(item)} type='submit' className='btn btn-secondary'>Ajouter au panier</button>
        </p>
      </div>
    </article>
  );
  /* jshint ignore:end */

};

BookItem.propTypes = {
  item: PropTypes.shape({
    cover: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
  }),
  onAddToCart: PropTypes.func.isRequired
}

export default BookItem;

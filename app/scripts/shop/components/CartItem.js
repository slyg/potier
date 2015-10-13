import React from 'react';

let CartItem = ({ item, onRemoveFromCart }) => {
  return (
    /* jshint ignore:start */
    <div className='grid-4-1'>
      <div className='title' onClick={() => onRemoveFromCart(item)}>{item.title}</div>
      <div className='tar price'>{item.amount} × {item.price}€</div>
    </div>
    /* jshint ignore:end */
  );
};

CartItem.propTypes = {
  item: React.PropTypes.shape({
    title: React.PropTypes.string.isRequired,
    amount: React.PropTypes.number.isRequired,
    price: React.PropTypes.number.isRequired
  }).isRequired,
  onRemoveFromCart: React.PropTypes.func.isRequired
};

export default CartItem;

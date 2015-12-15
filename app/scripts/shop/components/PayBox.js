import React from 'react';
import { PropTypes } from 'react';

const PayBox = ({finalPrice, totalPrice}) => {

  const discountPrice = (Math.round((finalPrice + 0.00001) * 100) / 100).toFixed(2);
  const hasDiscount   = (discountPrice > 0);

  return (
    <div className={hasDiscount ? 'discount' : ''}>
      <div className='txtcenter'>
        <button className='btn btn-primary btn-large' type='submit'>Order Now</button>
      </div>
      {
        hasDiscount ?
        <p className='txtcenter mtm'>
          Pay {discountPrice}€ <small>instead of <strike>{totalPrice}€</strike>!</small>
        </p>
        : null
      }
    </div>
  );

};

PayBox.propTypes = {
  discount: PropTypes.shape({
    finalPrice: PropTypes.number.isRequired,
    totalPrice: PropTypes.string.isRequired
  })
};

export default PayBox;

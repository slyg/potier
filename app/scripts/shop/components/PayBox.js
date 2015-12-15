import React from 'react';
import { PropTypes } from 'react';

const PayBox = ({finalPrice, totalPrice}) => {

  const hasDiscount = (finalPrice > 0);
  let discountDom;

  if (hasDiscount){

    const finalPrice = (Math.round((finalPrice + 0.00001) * 100) / 100).toFixed(2);

    discountDom = (
      <p className='txtcenter mtm'>
        Pay {finalPrice}€ <small>instead of <strike>{totalPrice}€</strike>!</small>
      </p>
    );

  }

  return (
    <div className={hasDiscount ? 'discount' : ''}>
      <div className='txtcenter'>
        <button className='btn btn-primary btn-large' type='submit'>Order Now</button>
      </div>
      {discountDom}
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

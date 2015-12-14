import React from 'react';
import { PropTypes } from 'react';

const PayBox = ({discount}) => {

  const hasDiscount = (discount !==  null);
  let discountDom;

  if (hasDiscount){

    const finalPrice = (Math.round((discount.finalPrice + 0.00001) * 100) / 100).toFixed(2);

    discountDom = (
      <p className='txtcenter mtm'>
        Pay {finalPrice}€ <small>instead of <strike>{discount.totalPrice}€</strike>!</small>
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

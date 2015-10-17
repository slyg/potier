import React from 'react';
import { PropTypes } from 'react';

let PayBox = ({discount}) => {

  let discountOffer;

  if (discount !==  null){

    let finalPrice = (Math.round((discount.finalPrice + 0.00001) * 100) / 100).toFixed(2);

    discountOffer = (
      /* jshint ignore:start */
      <div className='mbm'>
        <h2>Special Offer !</h2>
        <p className='txtcenter'>
          {finalPrice}€ <small>instead of <strike>{discount.totalPrice}€</strike>!</small>
        </p>
      </div>
      /* jshint ignore:end */
    );

  }

  return (
    /* jshint ignore:start */
    <div className={discount ? 'discount' : ''}>
      {discountOffer}
      <div className='txtcenter'>
        <button className='btn btn-primary btn-large' type='submit'>Order Now</button>
      </div>
    </div>
    /* jshint ignore:end */
  );

};

PayBox.propTypes = {
  discount: PropTypes.shape({
    finalPrice: PropTypes.number.isRequired,
    totalPrice: PropTypes.string.isRequired
  })
};

export default PayBox;

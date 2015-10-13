import React from 'react';

let PayBox = ({discount}) => {

  /* jshint ignore:start */
  let discountOffer = (
    <div></div>
  );
  /* jshint ignore:end */

  if (discount !==  null){

    let finalPrice = (Math.round((discount.finalPrice + 0.00001) * 100) / 100).toFixed(2);

    /* jshint ignore:start */
    discountOffer = (
      <div className='mbm'>
        <h2>Offre spéciale !</h2>
        <p className='tac'>
          {finalPrice}€ <small>au lieu de <strike>{discount.totalPrice}€</strike> !</small>
        </p>
      </div>
    );
    /* jshint ignore:end */
  }

  /* jshint ignore:start */
  return (
    <div className={discount ? 'discount' : ''}>
      {discountOffer}
      <div className='tac'>
        <button className='btn btn-primary btn-large' type='submit'>
          Passer ma commande
        </button>
      </div>
    </div>
  );
  /* jshint ignore:end */

};

PayBox.propTypes = {
  discount: React.PropTypes.shape({
    finalPrice: React.PropTypes.number.isRequired,
    totalPrice: React.PropTypes.string.isRequired
  })
};

export default PayBox;

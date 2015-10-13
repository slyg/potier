import React from 'react/addons';

export default React.createClass({

  propTypes: {
    discount: React.PropTypes.shape({
      finalPrice: React.PropTypes.number.isRequired,
      totalPrice: React.PropTypes.string.isRequired
    })
  },

  render: function(){

    /* jshint ignore:start */
    let discountOffer = (
      <div></div>
    );
    /* jshint ignore:end */

    if (this.props.discount !==  null){

      let finalPrice = (Math.round((this.props.discount.finalPrice + 0.00001) * 100) / 100).toFixed(2);

      /* jshint ignore:start */
      discountOffer = (
        <div className='mbm'>
          <h2>Vous bénéficiez d'une offre spéciale !</h2>
          <p className='tac'>
            {finalPrice}€ <small>au lieu de <strike>{this.props.discount.totalPrice}€</strike> !</small>
          </p>
        </div>
      );
      /* jshint ignore:end */
    }

    /* jshint ignore:start */
    return (
      <div className={this.props.discount ? 'discount' : ''}>
        {discountOffer}
        <div className='tac'>
          <button className='btn btn-primary btn-large' type='submit'>
            Passer ma commande
          </button>
        </div>
      </div>
    );
    /* jshint ignore:end */

  }

});

import React from 'react/addons';

export default React.createClass({

  propTypes: {
    item: React.PropTypes.shape({
      cover: React.PropTypes.string.isRequired,
      price: React.PropTypes.number.isRequired
    }),
    onAddToCart: React.PropTypes.func.isRequired
  },

  render: function(){

    var item = this.props.item;

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
            <button onClick={() => this.props.onAddToCart(item)} type='submit' className='btn btn-secondary'>Ajouter au panier</button>
          </p>
        </div>
      </article>
    );
    /* jshint ignore:end */

  }

});

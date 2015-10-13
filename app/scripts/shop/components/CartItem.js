import React from 'react/addons';

export default React.createClass({

  propTypes: {
    item: React.PropTypes.shape({
      title: React.PropTypes.string.isRequired,
      amount: React.PropTypes.number.isRequired,
      price: React.PropTypes.number.isRequired
    }).isRequired,
    onRemoveFromCart: React.PropTypes.func.isRequired
  },

  render: function(){

    var item = this.props.item;

    /* jshint ignore:start */
    return (
      <div className='grid-4-1'>
        <div className='title' onClick={() => this.props.onRemoveFromCart(item)}>{item.title}</div>
        <div className='tar price'>{item.amount} × {item.price}€</div>
      </div>
    );
    /* jshint ignore:end */

  }

});

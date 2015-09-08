import React from 'react/addons';

export default class extends React.Component {

  render(){

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

}

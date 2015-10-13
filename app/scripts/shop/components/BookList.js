import BookItem from './BookItem';
import React from 'react/addons';
import { values, map, pipe } from 'ramda';

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

export default React.createClass({

  render: function(){

    // If no results
    if (this.props.items.length < 1) {
      return (
        /* jshint ignore:start */
        <p className='tac ptl'>Chargement...</p>
        /* jshint ignore:end */
      );
    }

    let bookItems = pipe(
      values,
      map(
        (item) => {
          return (
            /* jshint ignore:start */
            <li key={item.isbn}>
              <BookItem item={item} onAddToCart={this.props.onAddToCart} />
            </li>
            /* jshint ignore:end */
          );
        }
      )
    )(this.props.items);

    return (
      /* jshint ignore:start */
      <ReactCSSTransitionGroup transitionName='default_transition' transitionAppear={true}>
        <ul className="ul grid-2">{bookItems}</ul>
      </ReactCSSTransitionGroup>
      /* jshint ignore:end */
    );

  }

});

var React = window.React,
    BookItem = require('./BookItem'),
    ReactCSSTransitionGroup = React.addons.CSSTransitionGroup,
        _ = window._;

class BookList extends React.Component {

  render(){

    let self = this;

    // If no results
    if (this.props.items.length < 1) {
      return (
        /* jshint ignore:start */
        <p className='tac ptl'>Chargement...</p>
        /* jshint ignore:end */
      );
    }

    var bookItems = _.map(this.props.items, function(bookItem) {
      return (
        /* jshint ignore:start */
        <li key={bookItem.isbn}>
          <BookItem item={bookItem} />
        </li>
        /* jshint ignore:end */
      );
    });

    return (
      /* jshint ignore:start */
      <ReactCSSTransitionGroup transitionName='default_transition' transitionAppear={true}>
        <ul className="ul grid-2">{bookItems}</ul>
      </ReactCSSTransitionGroup>
      /* jshint ignore:end */
    );



  }

}

module.exports = BookList;

//<BookItem />

var React = window.React, // Argh... brunch
    ShopApp = require('./components/ShopApp');

React.render(
  /* jshint ignore:start */
  <ShopApp />,
  /* jshint ignore:end */
  document.getElementById('shop')
);

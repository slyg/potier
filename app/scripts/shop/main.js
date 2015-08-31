import 'knacss/sass/knacss.scss';
import '../../css/shop.scss'

import React from 'react';
import ShopApp from './components/ShopApp';

React.render(
  /* jshint ignore:start */
  <ShopApp />,
  /* jshint ignore:end */
  document.getElementById('shop')
);

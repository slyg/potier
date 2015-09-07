import 'knacss/sass/knacss.scss';
import '../../css/shop.scss';

import React from 'react';
import { Provider } from 'react-redux';
import App from './components/App';
import store from './store';
import scenario from './fixtures/scenario';

// store.subscribe(state => console.log('hey', store.getState()));
// scenario(store);
// console.log(store.getState());


React.render(
  /* jshint ignore:start */
  <App store={store} />,
  /* jshint ignore:end */
  document.getElementById('shop')
);

scenario(store);

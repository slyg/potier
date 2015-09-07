import 'knacss/sass/knacss.scss';
import '../../css/shop.scss';

import React from 'react';
import { Provider } from 'react-redux';
import App from './components/App';
import store from './store';

// store.dispatch({
//   type: 'RECEIVE_BOOKS',
//   books: [{isbn: '1', title: 'A'}, {isbn: '2', title: 'B'}]
// });
// console.log(store.getState());

React.render(
  /* jshint ignore:start */
  <Provider store={store}>
    {() => <App />}
  </Provider>,
  /* jshint ignore:end */
  document.getElementById('shop')
);

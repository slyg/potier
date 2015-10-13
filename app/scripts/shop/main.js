import 'knacss/sass/knacss.scss';
import '../../css/shop.scss';

import React        from 'react';
import ReactDom     from 'react-dom';
import { Provider } from 'react-redux';
import App          from './components/App';
import store        from './store';


ReactDom.render(
  /* jshint ignore:start */
  <Provider store={store}>
    <App />
  </Provider>,
  /* jshint ignore:end */
  document.getElementById('shop')
);

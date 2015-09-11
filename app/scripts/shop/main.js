import 'knacss/sass/knacss.scss';
import '../../css/shop.scss';

import React        from 'react/addons';
import { Provider } from 'react-redux';
import App          from './components/App';
import store        from './store';


React.render(
  /* jshint ignore:start */
  <Provider store={store}>
    {() => <App />}
  </Provider>,
  /* jshint ignore:end */
  document.getElementById('shop')
);

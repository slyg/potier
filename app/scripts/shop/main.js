import 'knacss/sass/knacss.scss';
import '../../css/shop.scss';

import React         from 'react';
import ReactDom      from 'react-dom';
import { Provider }  from 'react-redux';
import RootContainer from './containers/RootContainer';
import store         from './store';

ReactDom.render(

  <Provider store={store}>
    <RootContainer />
  </Provider>,

  document.getElementById('shop')
);

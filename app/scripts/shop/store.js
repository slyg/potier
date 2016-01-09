import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import sagas from './sagas';

const createStoreWithMiddleware = compose(
	applyMiddleware(thunk, sagas),
	window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

export default createStoreWithMiddleware(reducer);

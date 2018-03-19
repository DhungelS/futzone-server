import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';


import './index.css';
import App from './components/App';
import reducers from './reducers';

const middlwares = [thunk];

const store = createStore(
  reducers,
  {},
  applyMiddleware(...middlwares)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

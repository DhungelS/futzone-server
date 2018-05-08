import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';


import './index.css';
import App from './components/App';
import reducers from './reducers';

const middlewares = [thunk];
let enhancers;

if (process.env.NODE_ENV === 'development') {
  const { createLogger } = require('redux-logger');
  middlewares.push(createLogger());

  enhancers = compose(
    applyMiddleware(...middlewares),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  );
} else {
  enhancers = applyMiddleware(...middlewares)
}

const store = createStore(
  reducers,
  {},
  enhancers
);

// const authToken = loadAuthToken()

//   if(authToken){
//     const token = authToken;
//     store.dispatch()
//   }


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

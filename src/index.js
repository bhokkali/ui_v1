import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './store.js'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

const rootEl = document.getElementById('root')

ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
, rootEl);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default
    ReactDOM.render(
      <Provider store={store}>
        <NextApp />
      </Provider>, rootEl)
  })
}

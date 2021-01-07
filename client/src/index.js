import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import Router from './components/Router'
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Router />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import { UserContext, UserContextProvider } from './contexts/UserContext.js';
import { Provider } from 'react-redux';
import store from './redux/store';

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

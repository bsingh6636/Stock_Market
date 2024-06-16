import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import appStore from './components/utils/appStore';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={appStore}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>
);



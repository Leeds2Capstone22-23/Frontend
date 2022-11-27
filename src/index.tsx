import React from 'react';
import ReactDOM from 'react-dom/client';
import AuthHandler from './components/AuthHandler';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { defaultStore } from './redux';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Provider store={defaultStore}>
        <AuthHandler />
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

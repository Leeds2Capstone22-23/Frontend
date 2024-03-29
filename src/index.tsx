import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material';
import { PersistGate } from 'redux-persist/integration/react';
import AuthHandler from './components/AuthHandler';
import reportWebVitals from './reportWebVitals';
import { defaultStore, persistor } from './redux';
import { theme } from './styling/MainTheme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
        <Provider store={defaultStore}>
          <PersistGate loading={null} persistor={persistor}>
            <AuthHandler />
          </PersistGate>
        </Provider>
    </ThemeProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

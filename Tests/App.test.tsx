import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../src/App';
import { Provider } from 'react-redux';
import { defaultStore } from '../src/redux';

test('renders message', () => {
  render(
    <Provider store={defaultStore}>
        <App />
    </Provider>);
  const linkElement = screen.getAllByText(/Home/i);
  expect(linkElement[0]).toBeInTheDocument();
});

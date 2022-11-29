import *  as React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomePage from '../../../src/components/HomePage';
import { Provider } from 'react-redux';
import { defaultStore } from '../../../src/redux';


test('renders message', () => {
  render(
    <Provider store={defaultStore}>
        <HomePage />
    </Provider>
  );
  const linkElement = screen.getAllByText(/Label 1/i);
  expect(linkElement[0]).toBeInTheDocument();
  const docElement = screen.getAllByText(/Document 1/i);
  expect(docElement[0]).toBeInTheDocument();
});
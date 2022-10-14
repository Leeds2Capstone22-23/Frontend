import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders message', () => {
  render(<App />);
  const linkElement = screen.getAllByText(/Home/i);
  expect(linkElement[0]).toBeInTheDocument();
});

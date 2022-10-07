import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders message', () => {
  render(<App />);
  const linkElement = screen.getByText(/installed and setup/i);
  expect(linkElement).toBeInTheDocument();
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DocumentPage from '../../../src/components/DocumentPage';
import detectHighlight from '../../../src/logic/detectHighlight';

test('renders message', () => {
  render(<DocumentPage />);
  const linkElement = screen.getAllByText(/Lorem/i);
  expect(linkElement[0]).toBeInTheDocument();
});

test('Detect Highlight returns undefined', () => {
  const response = detectHighlight(undefined, window);
  expect(response).toBe(undefined);
});

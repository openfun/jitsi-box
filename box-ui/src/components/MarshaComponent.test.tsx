import React from 'react';
import { render, screen } from '@testing-library/react';
import MarshaComponent from './MarshaComponent';

test('renders learn react link', () => {
  render(<MarshaComponent />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

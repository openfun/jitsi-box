import React from 'react';
import { render, screen } from '@testing-library/react';
import HeaderComponent from './HeaderComponent';

test('renders learn react link', () => {
  render(<HeaderComponent />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import HomeButtonsComponent from './HomeButtonsComponent';

test('renders learn react link', () => {
  render(<HomeButtonsComponent />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
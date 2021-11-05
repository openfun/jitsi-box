import React from 'react';
import { render, screen } from '@testing-library/react';
import CreateMeetingComponent from './CreateMeetingComponent';

test('renders learn react link', () => {
  render(<CreateMeetingComponent />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
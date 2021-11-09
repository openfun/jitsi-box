import React from 'react';
import { render, screen } from '@testing-library/react';
import MarshaLoginComponent from './MarshaLoginComponent';

test('renders learn react link', () => {
    render(<MarshaLoginComponent />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});

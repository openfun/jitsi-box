import React from 'react';
import { render, screen } from '@testing-library/react';
import DashboardComponent from './DashboardComponent';

test('renders learn react link', () => {
    render(<DashboardComponent />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});

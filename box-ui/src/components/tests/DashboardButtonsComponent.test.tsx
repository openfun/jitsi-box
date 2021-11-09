import React from 'react';
import { render, screen } from '@testing-library/react';
import DashboardButtonsComponent from '../ts/DashboardButtonsComponent';

test('renders learn react link', () => {
    render(<DashboardButtonsComponent />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});

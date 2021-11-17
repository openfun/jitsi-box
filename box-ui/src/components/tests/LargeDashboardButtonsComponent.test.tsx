import React from 'react';
import { render, screen } from '@testing-library/react';
import LargeDashboardButtonsComponent from '../ts/LargeDashboardButtonsComponent';

test('renders learn react link', () => {
    render(<LargeDashboardButtonsComponent />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});

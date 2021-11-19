import React from 'react';
import { render, screen } from '@testing-library/react';
import QrCodeComponent from '../ts/QrCodeComponent';

test('renders learn react link', () => {
    render(<QrCodeComponent />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});

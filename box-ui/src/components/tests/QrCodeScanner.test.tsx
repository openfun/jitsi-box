import React from 'react';
import { render, screen } from '@testing-library/react';
import QrCodeScanner from '../ts/QrCodeScanner';

test('renders learn react link', () => {
    render(
        <QrCodeScanner
            close={() => {
                return;
            }}
            setInformation={() => {
                return;
            }}
        />,
    );
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});

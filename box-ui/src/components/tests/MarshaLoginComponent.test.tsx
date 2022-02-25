import React from 'react';
import { render, screen } from '@testing-library/react';
import MarshaLoginComponent from '../ts/MarshaLoginComponent';

test('renders learn react link', () => {
    render(
        <MarshaLoginComponent
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

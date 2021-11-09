import React from 'react';
import { render, screen } from '@testing-library/react';
import HeaderComponent from '../ts/HeaderComponent';

test('renders learn react link', () => {
    render(<HeaderComponent returnDisplayed={true} marshaDisplayed={true} />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import BoxHome from '../ts/Box/BoxHome';

test('renders learn react link', () => {
    render(<BoxHome />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});

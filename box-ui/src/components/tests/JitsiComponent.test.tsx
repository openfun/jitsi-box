import React from 'react';
import { render, screen } from '@testing-library/react';
import JitsiFrame from '../ts/JitsiFrame';

test('renders learn react link', () => {
    render(<JitsiFrame information={{ domain: '', roomName: '' }} options={{}} />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});

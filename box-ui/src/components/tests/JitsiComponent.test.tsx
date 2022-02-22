import React from 'react';
import { render, screen } from '@testing-library/react';
import JitsiComponent from '../ts/JitsiComponent';

test('renders learn react link', () => {
    render(<JitsiComponent information={{ domain: '', roomName: '' }} />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});

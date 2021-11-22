import React from 'react';
import { render, screen } from '@testing-library/react';
import ConnectionComponent from '../ts/ConnectionComponent';

test('renders learn react link', () => {
    render(<ConnectionComponent />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});

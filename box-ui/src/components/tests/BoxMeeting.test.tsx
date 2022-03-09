import React from 'react';
import { render, screen } from '@testing-library/react';
import BoxMeeting from '../ts/Box/BoxMeeting';

test('renders learn react link', () => {
    render(<BoxMeeting />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});

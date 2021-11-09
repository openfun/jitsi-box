import React from 'react';
import { render, screen } from '@testing-library/react';
import JoinMeetingComponent from '../ts/JoinMeetingComponent';

test('renders learn react link', () => {
    render(<JoinMeetingComponent />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});

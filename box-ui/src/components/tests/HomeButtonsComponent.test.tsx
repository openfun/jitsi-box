import React from 'react';
import { render, screen } from '@testing-library/react';
import HomeButtonsComponent from '../ts/HomeButtonsComponent';

test('renders learn react link', () => {
    render(<HomeButtonsComponent counter={10} domain='education.meeting' roomName='dty' />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});

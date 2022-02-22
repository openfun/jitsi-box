import React from 'react';
import { render, screen } from '@testing-library/react';
import PopupComponent from '../ts/PopupComponent';

test('renders learn react link', () => {
    render(
        <PopupComponent
            information={{ domain: 'meeting.education', roomName: 'dty' }}
            setInformation={() => {
                return;
            }}
        />,
    );
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});

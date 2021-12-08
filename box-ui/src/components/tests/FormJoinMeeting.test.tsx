import React from 'react';
import { render, screen } from '@testing-library/react';
import FormJoinMeeting from '../ts/FormJoinMeeting';

test('renders learn react link', () => {
    render(
        <FormJoinMeeting
            close={() => {
                return;
            }}
            setInformation={() => {
                return;
            }}
            information={{ domain: 'meeting.education', roomName: 'dty' }}
        />,
    );
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});

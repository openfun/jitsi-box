import React from 'react';
import { render, screen } from '@testing-library/react';
import JoinMeetingComponent from '../ts/JoinMeetingComponent';

test('renders learn react link', () => {
    render(
        <JoinMeetingComponent
            domain='meeting.education'
            close={() => {
                return;
            }}
            roomName='dty'
            setRoomName={() => {
                return;
            }}
            setDomain={() => {
                return;
            }}
        />,
    );
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});

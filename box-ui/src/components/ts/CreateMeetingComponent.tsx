import React, { useState, FunctionComponent } from 'react';
import { Button } from '@mui/material';
import { useLocation } from 'react-router-dom';
import '../css/CreateMeetingComponent.css';
import HeaderComponent from './HeaderComponent';
import QRCode from 'react-qr-code';

const CreateMeetingComponent: FunctionComponent = () => {
    const data = useLocation();
    const [linkRoom, setLinkRoom] = useState(
        data.state && data.state.link ? data.state.link : 'https://meeting.education/test',
    );

    return (
        <div className='CreateMeetingComponent'>
            <div>
                <HeaderComponent homeDisplayed={true} marshaDisplayed={true} joinDisplayed={true} />
            </div>
            <div className='CreateMeetingContainer'>
                <div className='CreateMessage'>
                    <div>
                        <h1>Here is your Jitsi Link</h1>
                    </div>
                    <div>
                        <h4>{linkRoom}</h4>
                    </div>
                    <div className='QRCode'>
                        <QRCode value={linkRoom} size={128} />
                    </div>
                </div>
                <div>
                    <Button variant='contained' size='large'>
                        Go
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CreateMeetingComponent;

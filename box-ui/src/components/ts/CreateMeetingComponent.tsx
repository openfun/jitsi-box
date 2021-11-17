import React, { useState, FunctionComponent } from 'react';
import { useLocation } from 'react-router-dom';
import '../css/CreateMeetingComponent.css';
import HeaderComponent from './HeaderComponent';
import QRCode from 'react-qr-code';
import LargeDashboardButtonsComponent from './LargeDashboardButtonsComponent';
import JitsiComponent from './JitsiComponent';

const CreateMeetingComponent: FunctionComponent = () => {
    const data = useLocation();

    const [roomName] = useState(data.state && data.state.roomName ? data.state.roomName : 'dty');
    const [domain] = useState(data.state && data.state.domain ? data.state.domain : 'meeting.education');

    return (
        <div className='CreateMeetingComponent'>
            <div>
                <HeaderComponent homeDisplayed={true} marshaDisplayed={true} joinDisplayed={true} />
            </div>
            <div className='CreateMeetingContainer'>
                <div className='CreateMessage'>
                    <div>
                        <h4>Here is your Jitsi Link</h4>
                        <h5>
                            https://{domain}/{roomName}
                        </h5>
                    </div>
                    <div className='QRCode'>
                        <QRCode value={`https://${domain}/${roomName}`} size={156} />
                    </div>
                    <div>
                        <LargeDashboardButtonsComponent />
                    </div>
                </div>
                <div className='JitsiComponent'>
                    <JitsiComponent room={roomName} domain={domain} />
                </div>
            </div>
        </div>
    );
};

export default CreateMeetingComponent;

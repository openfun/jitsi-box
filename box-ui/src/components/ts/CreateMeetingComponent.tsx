import React, { useState, FunctionComponent } from 'react';
import { useLocation } from 'react-router-dom';
import '../css/CreateMeetingComponent.css';
import HeaderComponent from './HeaderComponent';
import QRCode from 'react-qr-code';
import LargeDashboardButtonsComponent from './LargeDashboardButtonsComponent';
import JitsiComponent from './JitsiComponent';
import PopupComponent from './PopupComponent';

const CreateMeetingComponent: FunctionComponent = () => {
    const data = useLocation();

    const [roomName] = useState(data.state && data.state.roomName ? data.state.roomName : 'dty');
    const [domain] = useState(data.state && data.state.domain ? data.state.domain : 'meeting.education');

    return (
        <div className='CreateMeetingComponent'>
            <div>
                <PopupComponent />
            </div>
            <div className='CreateMeetingContainer'>
                <div className='JitsiComponent'>
                    <JitsiComponent room={roomName} domain={domain} />
                </div>
            </div>
        </div>
    );
};

export default CreateMeetingComponent;

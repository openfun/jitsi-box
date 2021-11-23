import React, { useState, FunctionComponent } from 'react';
import { useLocation } from 'react-router-dom';
import '../css/CreateMeetingComponent.css';
import JitsiComponent from './JitsiComponent';
import PopupComponent from './PopupComponent';

const CreateMeetingComponent: FunctionComponent = () => {
    const data = useLocation();

    const [roomName, setRoomName] = useState(data.state && data.state.roomName ? data.state.roomName : 'dty');
    const [domain, setDomain] = useState(data.state && data.state.domain ? data.state.domain : 'meeting.education');

    console.log(roomName);
    return (
        <div className='CreateMeetingComponent'>
            <PopupComponent domain={domain} roomName={roomName} setRoomName={setRoomName} setDomain={setDomain} />
            <div className='CreateMeetingContainer'>
                <div className='JitsiComponent'>
                    <JitsiComponent roomName={roomName} domain={domain} />
                </div>
            </div>
        </div>
    );
};

export default CreateMeetingComponent;

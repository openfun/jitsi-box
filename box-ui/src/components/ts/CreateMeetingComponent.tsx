import React, { useState, FunctionComponent } from 'react';
import '../css/CreateMeetingComponent.css';
import JitsiComponent from './JitsiComponent';
import PopupComponent from './PopupComponent';

const CreateMeetingComponent: FunctionComponent = () => {
    const [roomName, setRoomName] = useState<string>('dty');
    const [domain, setDomain] = useState<string>('meeting.education');

    return (
        <div className='CreateMeetingComponent'>
            <PopupComponent domain={domain} roomName={roomName} setRoomName={setRoomName} setDomain={setDomain} />
            <div className='CreateMeetingContainer'>
                <div className='JitsiComponent'>
                    <JitsiComponent room={roomName} domain={domain} />
                </div>
            </div>
        </div>
    );
};

export default CreateMeetingComponent;

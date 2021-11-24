import React, { useState, FunctionComponent } from 'react';
import { useLocation } from 'react-router-dom';
import '../css/CreateMeetingComponent.css';
import JitsiComponent from './JitsiComponent';
import PopupComponent from './PopupComponent';

const CreateMeetingComponent: FunctionComponent = () => {
    const data = useLocation();
    const [information, setInformation] = useState({
        roomName: data.state && data.state.roomName ? data.state.roomName : 'dty',
        domain: data.state && data.state.domain ? data.state.domain : 'meeting.education',
    });
    const [returnHome, setReturnHome] = useState<boolean>(
        data.state && data.state.returnHome ? data.state.returnHome : true,
    );

    return (
        <div className='CreateMeetingComponent'>
            <PopupComponent
                information={information}
                setInformation={setInformation}
                returnHome={returnHome}
                setReturnHome={setReturnHome}
            />
            <div className='CreateMeetingContainer'>
                <div className='JitsiComponent'>
                    <JitsiComponent information={information} />
                </div>
            </div>
        </div>
    );
};

export default CreateMeetingComponent;

import React, { FunctionComponent } from 'react';
import './CreateMeetingComponent.css';
import HeaderComponent from './HeaderComponent';
const CreateMeetingComponent: FunctionComponent = () => {
    return (
        <div className='CreateMeetingComponent'>
            <div>
                <HeaderComponent returnDisplayed={true} marshaDisplayed={true} />
            </div>
            test Create
        </div>
    );
};

export default CreateMeetingComponent;

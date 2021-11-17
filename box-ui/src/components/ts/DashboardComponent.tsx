import React, { useState, FunctionComponent } from 'react';
import '../css/DashboardComponent.css';
import HeaderComponent from './HeaderComponent';
import DashboardButtonsComponent from './DashboardButtonsComponent';
import JitsiComponent from './JitsiComponent';
// import JitsiMeetComponent from './JitsiComponent';

const DashboardComponent: FunctionComponent = () => {
    const [micActivated, setMicActivated] = useState(true);
    return (
        <div className='Dashboard'>
            <HeaderComponent homeDisplayed={false} marshaDisplayed={false} joinDisplayed={false} />
            <div className='DashboardButtonsContainer'>
                {<DashboardButtonsComponent micActivated={micActivated} setMicActivated={setMicActivated} />}
            </div>
            {/* <div>mic = {micActivated ? 'yes' : 'no'}</div> */}
            <JitsiComponent mic={micActivated} />
        </div>
    );
};

export default DashboardComponent;

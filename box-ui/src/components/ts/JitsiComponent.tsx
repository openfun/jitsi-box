import React, { useEffect, FunctionComponent } from 'react';

import DashboardComponent from './DashboardComponent';
import '../css/JitsiComponent.css';

const JitsiMeetComponent: FunctionComponent = () => {
    const startConference = (): void => {
        try {
            const domain = 'meeting.education';
            const options = {
                roomName: 'TestForSamuel',
                parentNode: document.getElementById('jitsi-container'),
                interfaceConfigOverwrite: {
                    filmStripOnly: false,
                    SHOW_JITSI_WATERMARK: false,
                },
                configOverwrite: {
                    disableSimulcast: false,
                },
            };
            // @ts-expect-error js to ts error
            const api = new window.JitsiMeetExternalAPI(domain, options);
            console.log('api', api);
            api.addEventListener('videoConferenceJoined', () => {
                console.log('Local User Joined');
                // api.executeCommand('displayName', 'MyName');
            });
        } catch (error) {
            console.error('Failed to load Jitsi API', error);
        }
    };

    useEffect(() => {
        // verify the JitsiMeetExternalAPI constructor is added to the global..
        // @ts-expect-error js to ts error
        if (window.JitsiMeetExternalAPI) startConference();
        else alert('Jitsi Meet API script not loaded');
    }, []);

    return (

        <div className='JitsiPage'>
            <div className='JitsiComponent'>
                <div id='jitsi-container' className='jitsiContainer' />
            </div>
            <DashboardComponent/>
        </div>
    );
};

function handleClick() {
    console.log('✨ Ceci est un clic ✨');
}

export default JitsiMeetComponent;

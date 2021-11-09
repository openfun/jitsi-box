import React, { useEffect } from 'react';

import './JitsiComponent.css';

const JitsiMeetComponent = () => {
    const startConference = () => {
        try {
            const domain = 'meet.jit.si';
            const options = {
                roomName: 'roomName',
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
        <div className='JitsiComponent'>
            <div id='jitsi-container' className='jitsiContainer' />
        </div>
    );
};

export default JitsiMeetComponent;

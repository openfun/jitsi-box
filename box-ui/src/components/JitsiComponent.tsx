import React, { useEffect } from 'react';
import './JitsiMeet.css';

const JitsiMeetComponent = () => {
    const containerStyle = {
        width: '800px',
        height: '700px',
        flex: 1,
    };

    const jitsiContainerStyle = {
        display: 'block',
        width: '100%',
        height: '100%',
    };

    const startConference = () => {
        try {
            const domain = 'meet.jit.si';
            const options = {
                roomName: 'roomName',
                height: 400,
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
        <div style={containerStyle}>
            <div id='jitsi-container' style={jitsiContainerStyle} />
        </div>
    );
};

export default JitsiMeetComponent;

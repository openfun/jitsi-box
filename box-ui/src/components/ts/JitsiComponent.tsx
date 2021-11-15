import React, { useEffect, FunctionComponent } from 'react';

import '../css/JitsiComponent.css';
interface InputRoomProps {
    domain: string;
    room: string;
}

const JitsiMeetComponent: FunctionComponent<InputRoomProps> = ({
    domain: domainName,
    room: roomName,
}: InputRoomProps) => {
    const startConference = (): void => {
        try {
            const options = {
                roomName: roomName,
                parentNode: document.getElementById('jitsi-container'),
                userInfo: {
                    email: '',
                    displayName: 'Raspi',
                },
                interfaceConfigOverwrite: {
                    TILE_VIEW_MAX_COLUMNS: 2,
                    filmStripOnly: false,
                    SHOW_JITSI_WATERMARK: true,
                    SHOW_WATERMARK_FOR_GUESTS: false,
                    DISPLAY_WELCOME_PAGE_CONTENT: false,
                    DISABLE_JOIN_LEAVE_NOTIFICATIONS: false,
                    TOOLBAR_BUTTONS: [
                        'microphone',
                        'camera',
                        'chat',
                        'recording',
                        'videoquality',
                        'fodeviceselection',
                        'settings',
                        'raisehand',
                        'invite',
                        'sharedvideo',
                        'shareaudio',
                        'invite',
                        'tileview',
                    ],
                    TOOLBAR_ALWAYS_VISIBLE: true,
                },
                configOverwrite: {
                    disableSimulcast: false,
                    prejoinPageEnabled: false,
                    doNotStoreRoom: true,
                    preferH264: true,
                    startWithVideoMuted: false,
                    startWithAudioMuted: false,
                    enableWelcomePage: false,
                },
            };
            // @ts-expect-error js to ts error
            const api = new window.JitsiMeetExternalAPI(domainName, options);
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

    return <div id='jitsi-container' className='jitsiContainer' />;
};

export default JitsiMeetComponent;

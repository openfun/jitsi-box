import React, { useEffect, FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/JitsiComponent.css';
interface InputRoomProps {
    domain: string;
    room: string;
}

const JitsiMeetComponent: FunctionComponent<InputRoomProps> = ({
    domain: domainName,
    room: roomName,
}: InputRoomProps) => {
    const navigate = useNavigate();
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
                    MOBILE_APP_PROMO: false,
                    TILE_VIEW_MAX_COLUMNS: 2,
                    filmStripOnly: false,
                    SHOW_JITSI_WATERMARK: true,
                    SHOW_WATERMARK_FOR_GUESTS: false,
                    DISPLAY_WELCOME_PAGE_CONTENT: false,
                    TOOLBAR_BUTTONS: [
                        'microphone',
                        'camera',
                        'chat',
                        'recording',
                        'videoquality',
                        'fodeviceselection',
                        'raisehand',
                        'tileview',
                        'hangup',
                    ],
                    TOOLBAR_ALWAYS_VISIBLE: true,
                },
                configOverwrite: {
                    disableSimulcast: false,
                    prejoinPageEnabled: false,
                    doNotStoreRoom: true,
                    preferH264: true,
                    startWithVideoMuted: true,
                    startWithAudioMuted: true,
                    enableWelcomePage: false,
                },
            };
            // @ts-expect-error js to ts error
            const api = new window.JitsiMeetExternalAPI(domainName, options);
            api.addListener('videoConferenceLeft', () => {
                console.log('Video Conference Left');
                navigate(
                    { pathname: '/' },
                    {
                        replace: true,
                        state: { count: 10 },
                    },
                );
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

    return <div id='jitsi-container' className='jitsiContainer' />;
};

export default JitsiMeetComponent;

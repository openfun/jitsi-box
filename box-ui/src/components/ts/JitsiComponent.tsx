import React, { useEffect, FunctionComponent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/JitsiComponent.css';
interface InputRoomProps {
    domain: string;
    roomName: string;
}

const JitsiMeetComponent: FunctionComponent<InputRoomProps> = (props: InputRoomProps) => {
    const navigate = useNavigate();
    const [meetLaunched, setMeetLaunched] = useState<boolean>(false);
    const startConference = (): void => {
        if (!meetLaunched) {
            try {
                const options = {
                    roomName: props.roomName,
                    parentNode: document.getElementById('jitsi-container'),
                    userInfo: {
                        email: '',
                        displayName: 'Raspi',
                    },
                    interfaceConfigOverwrite: {
                        MOBILE_APP_PROMO: false,
                        filmStripOnly: false,
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
                        startWithVideoMuted: false,
                        startWithAudioMuted: false,
                        enableWelcomePage: false,
                    },
                };
                // @ts-expect-error js to ts error
                const api = new window.JitsiMeetExternalAPI(props.domain, options);
                setMeetLaunched(true);
                api.addListener('videoConferenceLeft', () => {
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
        }
    };

    useEffect(() => {
        // verify the JitsiMeetExternalAPI constructor is added to the global..
        // @ts-expect-error js to ts error
        if (window.JitsiMeetExternalAPI) {
            startConference();
        } else alert('Jitsi Meet API script not loaded');
    }, [props]);

    return <div id='jitsi-container' className='jitsiContainer' />;
};

export default JitsiMeetComponent;

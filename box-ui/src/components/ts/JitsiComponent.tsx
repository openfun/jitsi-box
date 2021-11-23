import React, { useEffect, FunctionComponent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/JitsiComponent.css';
interface InputRoomProps {
    information: {
        domain: string;
        roomName: string;
    };
    returnHome: boolean;
}

const JitsiMeetComponent: FunctionComponent<InputRoomProps> = (props: InputRoomProps) => {
    const navigate = useNavigate();

    console.log('props');
    console.log(props);
    useEffect(() => {
        // verify the JitsiMeetExternalAPI constructor is added to the global..
        // @ts-expect-error js to ts error
        if (window.JitsiMeetExternalAPI) {
            try {
                const options = {
                    roomName: props.information.roomName,
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
                const api = new window.JitsiMeetExternalAPI(props.information.domain, options);
                console.log('props.returnHome');
                console.log(props.returnHome);

                api.addListener('videoConferenceLeft', () => {
                    console.log(props.returnHome);
                    if (props.returnHome) {
                        navigate(
                            { pathname: '/' },
                            {
                                replace: true,
                                state: { count: 10 },
                            },
                        );
                    }
                    api.dispose();
                });
                return () => {
                    api.executeCommand('hangup');
                };
            } catch (error) {
                console.error('Failed to load Jitsi API', error);
            }
        } else alert('Jitsi Meet API script not loaded');
    }, [props.information]);

    return <div id='jitsi-container' className='jitsiContainer' />;
};

export default JitsiMeetComponent;

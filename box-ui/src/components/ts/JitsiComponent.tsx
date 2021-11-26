import React, { useEffect, FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import CallEndIcon from '@mui/icons-material/CallEnd';
import '../css/JitsiComponent.css';

interface InputRoomProps {
    information: {
        domain: string;
        roomName: string;
    };
}

const JitsiMeetComponent: FunctionComponent<InputRoomProps> = (props: InputRoomProps) => {
    const navigate = useNavigate();
    const returnHomePage = () => {
        navigate(
            { pathname: '/' },
            {
                replace: true,
                state: { count: 10, roomName: props.information.roomName, domain: props.information.domain },
            },
        );
    };
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
                            'recording',
                            'videoquality',
                            'fodeviceselection',
                            'raisehand',
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
                const api = new window.JitsiMeetExternalAPI(props.information.domain, options);
                api.addListener('videoConferenceLeft', () => {
                    api.dispose();
                });
                return () => {
                    api.executeCommand('hangup');
                };
            } catch (error) {
                console.error('Failed to load Jitsi API', error);
            }
        } else {
            alert('Jitsi Meet API script not loaded');
        }
    }, [props.information]);

    return (
        <div style={{ height: '100%' }}>
            <div id='jitsi-container' className='jitsiContainer' />
            <div className='hangupButton'>
                <IconButton color='inherit' size='large' onClick={returnHomePage}>
                    <CallEndIcon />
                </IconButton>
            </div>
        </div>
    );
};

export default JitsiMeetComponent;

import React, { useEffect, useState, FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import CallEndIcon from '@mui/icons-material/CallEnd';
import '../css/JitsiComponent.css';
import { InputRoomProps } from '../../types';

const JitsiMeetComponent: FunctionComponent<InputRoomProps> = (props: InputRoomProps) => {
    const [displayHangup, setDisplayHangup] = useState<boolean>();
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
                setDisplayHangup(false);
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
                        SHOW_CHROME_EXTENSION_BANNER: false,
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
                        DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
                        SHOW_DEEP_LINKING_IMAGE: false,
                    },
                    configOverwrite: {
                        disableSimulcast: false,
                        disableDeepLinking: true,
                        prejoinPageEnabled: false,
                        preferH264: true,
                        startWithVideoMuted: false,
                        startWithAudioMuted: true,
                        enableWelcomePage: false,
                    },
                    onload: () => {
                        setDisplayHangup(true);
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
            console.log('after alert');
            // @ts-expect-error js to ts error
            if (window.reload_js) {
                // @ts-expect-error js to ts error
                window.reload_js('https://meet.jit.si/external_api.js');
            }
            navigate({ pathname: '/' });
        }
    }, [props.information, setDisplayHangup]);

    return (
        <div style={{ height: '100%' }}>
            <div id='jitsi-container' className='jitsiContainer' />
            {displayHangup ? (
                <div className='hangupButton'>
                    <IconButton color='inherit' size='large' onClick={returnHomePage}>
                        <CallEndIcon />
                    </IconButton>
                </div>
            ) : null}
        </div>
    );
};

export default JitsiMeetComponent;

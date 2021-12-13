import React, { useEffect, useState, FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import CallEndIcon from '@mui/icons-material/CallEnd';
import '../css/JitsiComponent.css';
import { InputRoomProps } from '../../utils/Props';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import JitsiMeetExternalAPI from '../../utils/JitsiMeetExternalAPI';

const loadJitsiScript = (url: string) =>
    new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
    });

const instantiateJitsi = async (
    roomNameFromProps: string,
    domainFromProps: string,
    displayHangupFunction: React.Dispatch<React.SetStateAction<boolean | undefined>>,
) => {
    if (!window.JitsiMeetExternalAPI) {
        await loadJitsiScript(`https://${domainFromProps}/external_api.js`);
    }
    displayHangupFunction(false);
    const options = {
        roomName: roomNameFromProps,
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
            TOOLBAR_BUTTONS: ['microphone', 'camera', 'videoquality', 'fodeviceselection', 'raisehand', 'tileview'],
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
            displayHangupFunction(true);
        },
    };
    // @ts-expect-error js to ts error
    const api = new window.JitsiMeetExternalAPI(domainFromProps, options);
    api.addListener('videoConferenceLeft', () => {
        api.dispose();
    });
    return () => {
        api.dispose();
    };
};

const JitsiMeetComponent: FunctionComponent<InputRoomProps> = (props: InputRoomProps) => {
    const [displayHangup, setDisplayHangup] = useState<boolean>();
    const navigate = useNavigate();
    const returnHomePage = () => {
        navigate(
            { pathname: '/' },
            {
                replace: true,
                state: { count: 120, roomName: props.information.roomName, domain: props.information.domain },
            },
        );
    };
    useEffect(() => {
        // verify the JitsiMeetExternalAPI constructor is added to the global..
        try {
            const cleanupPromise = instantiateJitsi(
                props.information.roomName,
                props.information.domain,
                setDisplayHangup,
            );
            return () => {
                cleanupPromise.then((cleanup) => cleanup && cleanup());
            };
        } catch (error) {
            alert('Error loading Jitsi Meet API');
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

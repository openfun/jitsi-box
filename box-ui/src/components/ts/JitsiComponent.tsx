import React, { useEffect, FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/JitsiComponent.css';
import { InputRoomProps } from '../../utils/Props';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import JitsiMeetExternalAPI from '../../utils/JitsiMeetExternalAPI';

const loadJitsiScript = (url: string) =>
    new Promise((resolve, reject) => {
        document.getElementById('jitsi-api-script')?.remove();
        const script = document.createElement('script');
        script.setAttribute('id', 'jitsi-api-script');
        script.src = url;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
    });

const instantiateJitsi = async (
    roomNameFromProps: string,
    domainFromProps: string,
    overwriteOptions: ConstructorParameters<typeof JitsiMeetExternalAPI>[1] = {},
): Promise<JitsiMeetExternalAPI> => {
    await loadJitsiScript(`https://${domainFromProps}/external_api.js`);
    const defaultOptions = {
        roomName: roomNameFromProps,
        parentNode: document.getElementById('jitsi-container') || undefined,
        userInfo: {
            email: '',
            displayName: 'Unknown',
        },
        interfaceConfigOverwrite: {
            MOBILE_APP_PROMO: false,
            SHOW_CHROME_EXTENSION_BANNER: false,
            DISPLAY_WELCOME_PAGE_CONTENT: false,
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
    };
    const options = { ...defaultOptions, ...overwriteOptions };
    const api = new window.JitsiMeetExternalAPI(domainFromProps, options) as JitsiMeetExternalAPI;
    api.addListener('videoConferenceLeft', () => {
        api.dispose();
    });
    return api;
};

const JitsiMeetComponent: FunctionComponent<InputRoomProps> = (props: InputRoomProps) => {
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
        let apiPromise = instantiateJitsi(props.information.roomName, props.information.domain, {
            userInfo: {
                email: '',
                displayName: 'Jitsi-Box',
            },
            interfaceConfigOverwrite: {
                TOOLBAR_BUTTONS: [
                    'microphone',
                    'camera',
                    'videoquality',
                    'fodeviceselection',
                    'raisehand',
                    'tileview',
                    'hangup',
                ],
                TOOLBAR_ALWAYS_VISIBLE: true,
            },
        });
        apiPromise
            .then((api) => {
                api.addListener('videoConferenceLeft', () => {
                    api.dispose();
                    returnHomePage();
                });
            })
            .catch(() => {
                alert('Error loading Jitsi Meet API');
                navigate({ pathname: '/' });
            });
        return () => {
            apiPromise.then((api) => {
                api.dispose();
            });
        };
    }, [props.information]);

    return (
        <div style={{ height: '100%' }}>
            <div id='jitsi-container' className='jitsiContainer' />
        </div>
    );
};

export default JitsiMeetComponent;

import React, { useEffect, FunctionComponent } from 'react';
import '../css/JitsiFrame.css';
import { JitsiFrameProps } from '../../utils/Props';
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
    domainFromProps: string,
    options: ConstructorParameters<typeof JitsiMeetExternalAPI>[1] = {},
): Promise<JitsiMeetExternalAPI> => {
    await loadJitsiScript(`https://${domainFromProps}/external_api.js`);
    return new window.JitsiMeetExternalAPI(domainFromProps, options) as JitsiMeetExternalAPI;
};

const JitsiFrame: FunctionComponent<JitsiFrameProps> = (props: JitsiFrameProps) => {
    useEffect(() => {
        const defaultOptions: ConstructorParameters<typeof JitsiMeetExternalAPI>[1] = {
            roomName: props.information.roomName,
            parentNode: document.getElementById('jitsi-container') || undefined,
            userInfo: {
                email: '',
                displayName: 'Unknown',
            },
            interfaceConfigOverwrite: {
                MOBILE_APP_PROMO: false,
                SHOW_CHROME_EXTENSION_BANNER: false,
                DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
                SHOW_DEEP_LINKING_IMAGE: false,
            },
            configOverwrite: {
                disableDeepLinking: true,
                enableWelcomePage: false,
            },
        };

        const apiPromise = instantiateJitsi(props.information.domain, { ...defaultOptions, ...props.options });
        apiPromise
            .then((api) => {
                api.addListener('videoConferenceLeft', () => {
                    api.dispose();
                });

                props.configure?.(api);
            })
            .catch(() => {
                alert('Error loading Jitsi Meet API');
                props.onError?.();
            });
        return () => {
            apiPromise.then((api) => {
                api.dispose();
            });
        };
    }, [props.information, props.options, props.configure, props.onError]);

    return <div id='jitsi-container' className='jitsiContainer' />;
};

export default JitsiFrame;

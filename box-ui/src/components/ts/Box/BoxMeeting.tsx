import React, { useRef, useState, useEffect, useMemo, useCallback, FunctionComponent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../css/BoxMeeting.css';
import PopupComponent from '../PopupComponent';
import { LocationState } from '../../../utils/State';
import JitsiFrame from '../JitsiFrame';

const BoxMeeting: FunctionComponent = () => {
    const navigate = useNavigate();
    const state = useLocation().state as LocationState;
    const [information, setInformation] = useState({
        roomName: state && state.roomName ? state.roomName : 'dty',
        domain: state && state.domain ? state.domain : 'meeting.education',
    });
    const meetingOptions = useMemo(
        () => ({
            userInfo: {
                email: '',
                displayName: 'Jitsi-Box',
            },
            configOverwrite: {
                toolbarButtons: [
                    'microphone',
                    'camera',
                    'videoquality',
                    'fodeviceselection',
                    'raisehand',
                    'tileview',
                    'hangup',
                ],
                toolbarConfig: {
                    alwaysVisible: true,
                },
                prejoinConfig: {
                    enabled: false,
                },
                startWithVideoMuted: false,
                startWithAudioMuted: true,
            },
        }),
        [],
    );
    const [raised, setRaised] = useState(false);
    const [counter, setCounter] = useState(0);
    const TimeOutRef = useRef<NodeJS.Timeout>();

    function lowerHand() {
        setRaised(false);
        setCounter(0);
    }

    const updateCounter = useCallback((timeRaised: number) => {
        if (timeRaised > 0) {
            setCounter((counter) => counter + 1);
        }
        if (timeRaised == 0) {
            setCounter((counter) => Math.max(0, counter - 1));
        }
    }, []);

    function switchHand() {
        let stop = false;
        if (counter > 0) {
            stop = true;
        }
        if (stop) {
            setRaised(true);
        } else {
            setRaised(false);
        }
    }
    useEffect(() => {
        const id = setTimeout(lowerHand, 10000);
        if (TimeOutRef.current) {
            clearTimeout(TimeOutRef.current);
        }
        TimeOutRef.current = id;
        switchHand();
    }, [counter]);

    return (
        <div className='BoxMeeting'>
            <PopupComponent information={information} setInformation={setInformation} />
            <div className='CreateMeetingContainer'>
                <div className='JitsiComponent'>
                    <div
                        className='overlay'
                        style={{
                            backgroundColor: 'yellow',
                            opacity: raised ? '0.5' : '0',
                        }}
                    />
                    <JitsiFrame
                        information={information}
                        options={meetingOptions}
                        configure={(api) => {
                            api.addListener('videoConferenceLeft', () => {
                                navigate('/', {
                                    replace: true,
                                    state: {
                                        count: 120,
                                        roomName: information.roomName,
                                        domain: information.domain,
                                    },
                                });
                            });
                            api.addListener('raiseHandUpdated', (res) => {
                                const timeRaised = res.handRaised;
                                updateCounter(timeRaised);
                            });
                        }}
                        onError={() => {
                            navigate('/');
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default BoxMeeting;

import React, { FunctionComponent, useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CaptureImage from '../CaptureImage';
import '../../css/Meeting.css';
import PopupComponent from '../PopupComponent';
import { LocationState } from '../../../utils/State';
import JitsiFrame from '../JitsiFrame';
import { JitsiFrameProps } from '../../../utils/Props';
import { useTranslation } from 'react-i18next';

const TeacherMeeting: FunctionComponent = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const state = useLocation().state as LocationState;
    const [information, setInformation] = useState({
        roomName: state && state.roomName ? state.roomName : 'dty',
        domain: state && state.domain ? state.domain : 'meeting.education',
    });
    const [counterRaised, setCounterRaised] = useState(0);
    const timeout = useRef<ReturnType<typeof setTimeout>>();

    useEffect(() => {
        if (counterRaised > 0) {
            const id = setTimeout(() => {
                setCounterRaised(0);
            }, 10000);
            if (timeout.current) {
                clearTimeout(timeout.current);
            }
            timeout.current = id;
        }
    }, [counterRaised]);

    const meetingOptions = useMemo<Exclude<JitsiFrameProps['options'], undefined>>(() => {
        return {
            userInfo: {
                email: '',
                displayName: t('teacher'),
            },
            configOverwrite: {
                disabledSounds: ['RAISE_HAND_SOUND', 'INCOMING_MSG_SOUND'],
                toolbarButtons: [
                    'microphone',
                    'camera',
                    'videoquality',
                    'fodeviceselection',
                    'tileview',
                    'hangup',
                    'chat',
                    'desktop',
                ],
                prejoinConfig: {
                    enabled: false,
                },
                startWithVideoMuted: false,
                startWithAudioMuted: true,
            },
        };
    }, []);

    const configure = useCallback<Exclude<JitsiFrameProps['configure'], undefined>>((api) => {
        api.addListener('videoConferenceLeft', () => {
            navigate('/teacher', {
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
            if (timeRaised > 0) {
                setCounterRaised((counter) => counter + 1);
            }
            if (timeRaised == 0) {
                setCounterRaised((counter) => Math.max(0, counter - 1));
            }
        });
    }, []);

    const onError = useCallback(() => {
        navigate('/teacher');
    }, [navigate]);

    return (
        <div className='Meeting'>
            <PopupComponent information={information} setInformation={setInformation} />
            <div className='CreateMeetingContainer'>
                <div className='JitsiComponent'>
                    {counterRaised > 0 && <div className='overlay' />}
                    <JitsiFrame
                        information={information}
                        options={meetingOptions}
                        configure={configure}
                        onError={onError}
                    />
                </div>
            </div>
            <div className='CameraManagement'>
                <CaptureImage roomName={information.roomName} />
            </div>
        </div>
    );
};

export default TeacherMeeting;

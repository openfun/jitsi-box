import React, { useRef, useState, useEffect, useMemo, useCallback, FunctionComponent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CaptureImage from '../CaptureImage';
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

    return (
        <div className='BoxMeeting'>
            <PopupComponent information={information} setInformation={setInformation} />
            <div className='CreateMeetingContainer'>
                <div className='JitsiComponent'>
                    <JitsiFrame
                        information={information}
                        isBox={true}
                        options={meetingOptions}
                        configure={(api) => {
                            api.addListener('videoConferenceLeft', () => {
                                navigate('/box', {
                                    replace: true,
                                    state: {
                                        count: 120,
                                        roomName: information.roomName,
                                        domain: information.domain,
                                    },
                                });
                            });
                        }}
                        onError={() => {
                            navigate('/box');
                        }}
                    />
                </div>
            </div>
            <div className='CameraManagement'>
                <CaptureImage roomName={information.roomName} />
            </div>
        </div>
    );
};

export default BoxMeeting;

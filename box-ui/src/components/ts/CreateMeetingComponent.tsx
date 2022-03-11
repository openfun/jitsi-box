import React, { useState, FunctionComponent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/CreateMeetingComponent.css';
import PopupComponent from './PopupComponent';
import { LocationState } from '../../utils/State';
import JitsiFrame from './JitsiFrame';
import CaptureImage from './CaptureImageComponent';

const CreateMeetingComponent: FunctionComponent = () => {
    const navigate = useNavigate();
    const state = useLocation().state as LocationState;
    const [information, setInformation] = useState({
        roomName: state && state.roomName ? state.roomName : 'dty',
        domain: state && state.domain ? state.domain : 'meeting.education',
    });
    const meetingOptions = {
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
    };

    return (
        <div className='CreateMeetingComponent'>
            <PopupComponent information={information} setInformation={setInformation} />
            <div className='CreateMeetingContainer'>
                <div className='JitsiComponent'>
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
                        }}
                        onError={() => {
                            navigate('/');
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

export default CreateMeetingComponent;

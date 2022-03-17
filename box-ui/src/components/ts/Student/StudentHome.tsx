import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LanguageSelector from '../LanguageSelector';
import InputButton from '../InputButton';
import JitsiBoxLogo from '../../../logo/jitsibox.svg';
import '../../css/Home.css';
import '../../css/StudentHome.css';
import { LocationState } from '../../../utils/State';
import ProgressButton from '../ProgressButton';

const StudentHome: FunctionComponent = () => {
    const { t } = useTranslation();
    const state = useLocation().state as LocationState | null;
    const navigate = useNavigate();

    const joinMeeting = (roomName: string) => {
        if (roomName === '') {
            alert('Veuillez choisir une salle');
        } else {
            navigate(
                { pathname: '/student/meeting' },
                {
                    state: { roomName: roomName, domain: 'meeting.education' },
                },
            );
        }
    };

    const launchLastMeeting = () => {
        navigate(
            { pathname: '/student/meeting' },
            {
                replace: true,
                state: { roomName: state ? state.roomName : '', domain: state ? state.domain : '' },
            },
        );
    };

    return (
        <div className='HomeContainer'>
            <div className='LogoContainer'>
                <img src={JitsiBoxLogo} alt='logo de la jitsi-box' className='logo' />
            </div>
            <div className='HomeButtonsContainer'>
                <InputButton buttonLabel={t('joinAMeeting')} inputLabel={t('enterRoomName')} onSubmit={joinMeeting} />
                <ProgressButton initialCounter={state ? state.count : 0} onClick={launchLastMeeting}>
                    {t('goBackToMeeting')}
                    <br />
                    {state?.roomName}
                </ProgressButton>
                <Link to='/teacher'>{t('linkForTeacher')}</Link>
            </div>
            <LanguageSelector />
        </div>
    );
};

export default StudentHome;

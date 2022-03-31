import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LanguageSelector from '../LanguageSelector';
import InputButton from '../InputButton';
import JitsiBoxLogo from '../../../logo/jitsibox_black.svg';
import '../../css/Home.css';
import { LocationState } from '../../../utils/State';
import ProgressButton from '../ProgressButton';

const TeacherHome: FunctionComponent = () => {
    const { t } = useTranslation();
    const state = useLocation().state as LocationState | null;
    const navigate = useNavigate();

    const joinMeeting = (roomName: string) => {
        if (roomName === '') {
            alert('Veuillez choisir une salle');
        } else {
            navigate(
                { pathname: '/teacher/meeting' },
                {
                    state: { roomName: roomName, domain: 'meeting.education' },
                },
            );
        }
    };

    const launchLastMeeting = () => {
        navigate(
            { pathname: '/teacher/meeting' },
            {
                replace: true,
                state: { roomName: state ? state.roomName : '', domain: state ? state.domain : '' },
            },
        );
    };

    return (
        <div className='HomeContainer TeacherHome'>
            <div className='LogoContainer'>
                <img src={JitsiBoxLogo} alt='logo de la jitsi-box' className='logo' />
            </div>
            <h2>{t('teacherSpace')}</h2>
            <div className='HomeButtonsContainer'>
                <InputButton buttonLabel={t('joinAMeeting')} inputLabel={t('enterRoomName')} onSubmit={joinMeeting} />
                <ProgressButton initialCounter={state ? state.count : 0} onClick={launchLastMeeting}>
                    {t('goBackToMeeting')}
                    <br />
                    {state?.roomName}
                </ProgressButton>
                <Link to='/student'>{t('linkForStudent')}</Link>
            </div>
            <LanguageSelector />
        </div>
    );
};

export default TeacherHome;

import React, { FunctionComponent } from 'react';
import HomeButton from '../HomeButton';
import '../../css/Home.css';
import JitsiBoxLogo from '../../../logo/jitsibox.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import { LocationState } from '../../../utils/State';
import { useTranslation } from 'react-i18next';
import GenerateRandomFrenchRoomName from '../../../dictionnaries_fr';
import ProgressButton from '../ProgressButton';
import SelectButton from '../SelectButton';
import { availableLanguages } from '../../../i18n';

const BoxHome: FunctionComponent = () => {
    const state = useLocation().state as LocationState | null;
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const launchMeeting = () => {
        navigate(
            { pathname: '/box/meeting' },
            {
                state: { roomName: GenerateRandomFrenchRoomName(), domain: 'meeting.education' },
            },
        );
    };

    const launchLastMeeting = () => {
        navigate(
            { pathname: '/box/meeting' },
            {
                state: { roomName: state ? state.roomName : '', domain: state ? state.roomName : '' },
            },
        );
    };

    return (
        <div className='HomeContainer'>
            <div className='LogoContainer'>
                <img src={JitsiBoxLogo} alt='logo de la jitsi-box' className='logo' />
            </div>
            <div className='HomeButtonsContainer'>
                <HomeButton id='StartMeetingButton' onClick={launchMeeting} variant='contained'>
                    {t('launchMeeting')}
                </HomeButton>
                <ProgressButton initialCounter={state ? state.count : 0} onClick={launchLastMeeting}>
                    {t('goBackToMeeting')}
                    <br />
                    {state ? state.roomName : ''}
                </ProgressButton>
            </div>
            <SelectButton
                selectItems={{
                    inputLabelText: t('lang'),
                    menuItems: availableLanguages,
                }}
                value={i18n.language}
                onChange={(e) => i18n.changeLanguage(e.target.value)}
            />
        </div>
    );
};

export default BoxHome;

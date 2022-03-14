import React, { FunctionComponent, useState, useEffect } from 'react';
import HomeButtonsComponent from '../HomeButtonsComponent';
import HomeButton from '../HomeButton';
import '../../css/BoxHome.css';
import JitsiBoxLogo from '../../../logo/jitsibox.svg';
import LanguageSelector from '../LanguageSelector';
import { useLocation, useNavigate } from 'react-router-dom';
import { LocationState } from '../../../utils/State';
import { useTranslation } from 'react-i18next';
import GenerateRandomFrenchRoomName from '../../../dictionnaries_fr';

const BoxHome: FunctionComponent = () => {
    const state = useLocation().state as LocationState;
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [counter, setCounter] = useState(state && state.count ? state.count : 0);
    const [information] = useState({
        roomName: state && state.roomName ? state.roomName : '',
        domain: state && state.domain ? state.domain : '',
    });
    const launchMeeting = () => {
        navigate(
            { pathname: '/box/meeting' },
            {
                replace: true,
                state: { roomName: GenerateRandomFrenchRoomName(), domain: 'meeting.education' },
            },
        );
    };

    useEffect(() => {
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    }, [counter]);
    return (
        <div className='HomeContainer'>
            <div className='LogoContainer'>
                <img src={JitsiBoxLogo} alt='logo de la jitsi-box' className='logo' />
            </div>
            <div className='HomeButtonsContainer'>
                <HomeButton id='StartMeetingButton' onClick={launchMeeting} variant='contained'>
                    {t('launchMeeting')}
                </HomeButton>
                <HomeButtonsComponent counter={counter} roomName={information.roomName} domain={information.domain} />
            </div>
            <LanguageSelector />
        </div>
    );
};

export default BoxHome;

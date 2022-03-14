import React, { FunctionComponent } from 'react';
import HomeButton from './HomeButton';
import '../css/HomeButtonsComponent.css';
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { useNavigate } from 'react-router-dom';
import GenerateRandomFrenchRoomName from '../../dictionnaries_fr';
import { CounterProps } from '../../utils/Props';
import { useTranslation } from 'react-i18next';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    width: '60vw',
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
}));

const HomeButtonsComponent: FunctionComponent<CounterProps> = (props: CounterProps) => {
    const { t } = useTranslation();

    const navigate = useNavigate();
    const launchLastMeeting = () => {
        navigate(
            { pathname: '/box/meeting' },
            {
                replace: true,
                state: { roomName: props.roomName, domain: props.domain },
            },
        );
    };

    return (
        <>
            {props.counter > 0 ? (
                <div>
                    <div className='ButtonContainer'>
                        <HomeButton id='ReturnToMeetingButton' onClick={launchLastMeeting} variant='contained'>
                            {t('goBackToMeeting')}
                            <br />
                            {props.roomName}
                        </HomeButton>
                    </div>
                    <div className='LinearProgress'>
                        <BorderLinearProgress variant='determinate' value={(props.counter / 120) * 100} />
                    </div>
                    <div id='counter'>
                        {t('disappear')}
                        {props.counter} {t('seconds')}!
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default HomeButtonsComponent;

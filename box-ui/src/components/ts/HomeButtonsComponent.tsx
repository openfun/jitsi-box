import React, { FunctionComponent } from 'react';
import Button from '@mui/material/Button';
import '../css/HomeButtonsComponent.css';
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { useNavigate } from 'react-router-dom';
import GenerateRandomFrenchRoomName from '../../dictionnaries_fr';

interface CounterProps {
    counter: number;
    domain: string;
    roomName: string;
}
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
    const navigate = useNavigate();
    const launchLastMeeting = () => {
        navigate(
            { pathname: '/launch' },
            {
                replace: true,
                state: { roomName: props.roomName, domain: props.domain },
            },
        );
    };
    const launchMeeting = () => {
        navigate(
            { pathname: '/launch' },
            {
                replace: true,
                state: { roomName: GenerateRandomFrenchRoomName(), domain: '' },
            },
        );
    };
    return (
        <>
            <div className='ButtonContainer'>
                <Button id='StartMeetingButton' variant='contained' className='Button' onClick={launchMeeting}>
                    Démarrer un Meeting
                </Button>
            </div>
            {props.counter > 0 ? (
                <div>
                    <div className='ButtonContainer'>
                        <Button
                            id='ReturnToMeetingButton'
                            variant='contained'
                            className='Button'
                            onClick={launchLastMeeting}
                        >
                            Revenir dans le meeting (https://{props.domain}/{props.roomName})
                        </Button>
                    </div>
                    <div className='LinearProgress'>
                        <BorderLinearProgress variant='determinate' value={props.counter * 10} />
                    </div>
                    <div id='counter'>Disparaît dans {props.counter} secondes</div>
                </div>
            ) : null}
        </>
    );
};

export default HomeButtonsComponent;

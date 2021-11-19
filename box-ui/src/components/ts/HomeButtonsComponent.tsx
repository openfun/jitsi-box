import React from 'react';
import Button from '@mui/material/Button';
import '../css/HomeButtonsComponent.css';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

interface CounterProps {
    counter: number;
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

const HomeButtonsComponent = (props: CounterProps) => {
    return (
        <>
            <div className='ButtonContainer'>
                <Button id='StartMeetingButton' variant='contained' className='Button' component={Link} to='/launch'>
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
                            component={Link}
                            to='/launch'
                        >
                            Revenir dans le meeting
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

import React from 'react';
import Button from '@mui/material/Button';
import '../css/HomeButtonsComponent.css';
import { Link } from 'react-router-dom';

interface CounterProps {
    counter: number;
}

const HomeButtonsComponent = (props: CounterProps) => {
    let button;
    if (props.counter != 0) {
        button = (
            <Button id='ReturnToMeetingButton' variant='contained' className='Button' component={Link} to='/launch'>
                Revenir dans le meeting
            </Button>
        );
    }

    return (
        <div className='HomeButtonsComponent'>
            <div className='ButtonContainer'>
                <Button id='StartMeetingButton' variant='contained' className='Button' component={Link} to='/launch'>
                    Démarrer un Meeting
                </Button>
                <div>{button}</div>
            </div>
        </div>
    );
};

export default HomeButtonsComponent;

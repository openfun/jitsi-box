import React, { FunctionComponent } from 'react';
import Button from '@mui/material/Button';
import '../css/HomeButtonsComponent.css';
import { Link } from 'react-router-dom';
const HomeButtonsComponent: FunctionComponent = () => {
    return (
        <div className='HomeButtonsComponent'>
            <div className='ButtonContainer'>
                <Button id='StartMeetingButton' variant='contained' className='Button' component={Link} to='/launch'>
                    Démarrer un Meeting
                </Button>
                <Button id='ReturnToMeetingButton' variant='contained' className='Button' component={Link} to='/launch'>
                    Revenir dans le meeting
                </Button>
            </div>
        </div>
    );
};

export default HomeButtonsComponent;

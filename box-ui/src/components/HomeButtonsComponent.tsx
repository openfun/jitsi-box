import * as React from 'react';
import Button from '@mui/material/Button';
import './HomeButtonsComponent.css';
import { Link } from 'react-router-dom';
const HomeButtonsComponent = () => {
    return (
        <div className='HomeButtonsComponent'>
            <div className='ButtonContainer'>
                <Button variant='outlined' className='Button' component={Link} to='/create'>
                    Create a meeting
                </Button>
            </div>
            <div className='ButtonContainer'>
                <Button variant='outlined' className='Button' component={Link} to='/join'>
                    Join a meeting
                </Button>
            </div>
        </div>
    );
};

export default HomeButtonsComponent;

import React, { FunctionComponent } from 'react';
import Button from '@mui/material/Button';
import '../css/HomeButtonsComponent.css';
import { Link } from 'react-router-dom';
const HomeButtonsComponent: FunctionComponent = () => {
    return (
        <div className='HomeButtonsComponent'>
            <div className='ButtonContainer'>
                <Button variant='contained' className='Button' component={Link} to='/create'>
                    Launch Meeting
                </Button>
            </div>
        </div>
    );
};

export default HomeButtonsComponent;

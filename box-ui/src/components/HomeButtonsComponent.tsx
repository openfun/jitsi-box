import * as React from 'react';
import Button from '@mui/material/Button';
import './HomeButtonsComponent.css'
const HomeButtonsComponent = () => {


    return (
        <div className='HomeButtonsComponent'>
            <div className="ButtonContainer">
                <Button variant="outlined" className="Button">Create a meeting </Button>
            </div>
            <div className="ButtonContainer">
                <Button variant="outlined" className="Button">Join a meeting</Button>
            </div>
        </div>
      );
}

export default HomeButtonsComponent;
import * as React from 'react';
import Button from '@mui/material/Button';
import SliderComponent from './SliderComponent';

import './DashboardButtonsComponent.css'

import mute from '../images/mute.png'
import camera from '../images/camera.svg'

const DashboardButtonsComponent = () => {

    return (
        <div className='DashboardButtons'>
            
            <div className='DashboardButtonsRow'>
                <div className="ButtonContainer">
                    <Button variant="outlined" className="Button"> 
                        {/* <img src={mute} alt="mute" className='lmj-logo' /> */}
                        Mute
                    </Button>
                </div>
                <div className="ButtonContainer">
                    <Button variant="outlined" className="Button">
                        {/* <img src={camera} alt="start" className='lmj-logo' /> */}
                        Start/stop video
                    </Button>
                </div>
                <div className="ButtonContainer">
                    <Button variant="outlined" className="Button"> Participants </Button>
                </div>
                <div className="ButtonContainer">
                    <Button variant="outlined" className="Button"> Start/Stop Recording </Button>
                </div>
            </div>

            <div className='DashboardButtonsRow'>
                <div className="ButtonContainer">
                    <Button variant="outlined" className="Button"> Change View </Button>
                </div>
                <div className="ButtonContainer">
                    <Button variant="outlined" className="Button"> Chat </Button>
                </div>
                <div className="ButtonContainer">
                    <SliderComponent />
                </div>
            </div>
            
            <div className='DashboardButtonsRow'>
                <div className="ButtonContainer">
                    <Button variant="outlined" className="Button"> Leave </Button>
                </div>
            </div>

        </div>
      );
}

export default DashboardButtonsComponent;
import * as React from 'react';
import Button from '@mui/material/Button';
import SliderComponent from './SliderComponent';
import './DashboardButtonsComponent.css';

import CameraswitchOutlinedIcon from '@mui/icons-material/CameraswitchOutlined';
import VideoCameraBackOutlinedIcon from '@mui/icons-material/VideoCameraBackOutlined';
import MicNoneOutlinedIcon from '@mui/icons-material/MicNoneOutlined';
import MicOffOutlinedIcon from '@mui/icons-material/MicOffOutlined';
import FiberManualRecordOutlinedIcon from '@mui/icons-material/FiberManualRecordOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';

const DashboardButtonsComponent = () => {
    return (
        <div className='DashboardButtons'>
            <div className='DashboardButtonsRow'>
                <div className='ButtonContainer'>
                    <Button variant='outlined' className='Button'>
                        <MicNoneOutlinedIcon />
                    </Button>
                    Micro
                </div>
                <div className='ButtonContainer'>
                    <Button variant='outlined' className='Button'>
                        <VideoCameraBackOutlinedIcon />
                    </Button>
                    Start/Stop Camera
                </div>
                <div className='ButtonContainer'>
                    <Button variant='outlined' className='Button'>
                        <PeopleAltOutlinedIcon />
                    </Button>
                    Participants
                </div>
                <div className='ButtonContainer'>
                    <Button variant='outlined' className='Button'>
                        <FiberManualRecordOutlinedIcon />
                    </Button>
                    Enregistrer
                </div>
            </div>

            <div className='DashboardButtonsRow'>
                <div className='ButtonContainer'>
                    <Button variant='outlined' className='Button'>
                        <CameraswitchOutlinedIcon />
                    </Button>
                    Retour Vidéo
                </div>
                <div className='ButtonContainer'>
                    <Button variant='outlined' className='Button'>
                        <ForumOutlinedIcon />
                    </Button>
                    Chat
                </div>
                <div className='ButtonContainer'>
                    <SliderComponent />
                </div>
            </div>

            <div className='DashboardButtonsRow'>
                <div className='ButtonContainer'>
                    <Button variant='outlined' className='Button'>
                        <ExitToAppOutlinedIcon />
                    </Button>
                    Déconnexion
                </div>
            </div>
        </div>
    );
};

export default DashboardButtonsComponent;

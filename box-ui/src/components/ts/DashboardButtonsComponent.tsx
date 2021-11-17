import React, { useState } from 'react';
import Button from '@mui/material/Button';
import SliderComponent from './SliderComponent';
import '../css/DashboardButtonsComponent.css';
import CameraswitchOutlinedIcon from '@mui/icons-material/CameraswitchOutlined';
import VideoCameraBackOutlinedIcon from '@mui/icons-material/VideoCameraBackOutlined';
import MicNoneOutlinedIcon from '@mui/icons-material/MicNoneOutlined';
import MicOffOutlinedIcon from '@mui/icons-material/MicOffOutlined';
import FiberManualRecordOutlinedIcon from '@mui/icons-material/FiberManualRecordOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import StopCircleIcon from '@mui/icons-material/StopCircle';

interface DBProps {
    micActivated: boolean;
    setMicActivated: React.Dispatch<React.SetStateAction<boolean>>;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const DashboardButtonsComponent = (props: DBProps) => {
    const [saveActivated, setSaveActivated] = useState(false);

    const switchSave = (): void => {
        setSaveActivated(!saveActivated);
    };

    return (
        <div className='DashboardButtons'>
            <div className='DashboardButtonsRow'>
                <div className='ButtonContainer'>
                    <Button
                        variant='outlined'
                        className='Button'
                        onClick={() => props.setMicActivated(!props.micActivated)}
                        sx={{ borderRadius: 28 }}
                    >
                        {props.micActivated ? <MicNoneOutlinedIcon /> : <MicOffOutlinedIcon />}
                    </Button>
                    Mic
                </div>
                <div>{props.micActivated}</div>
                <div className='ButtonContainer'>
                    <Button variant='outlined' className='Button' sx={{ borderRadius: 28 }}>
                        <VideoCameraBackOutlinedIcon />
                    </Button>
                    Start/Stop Camera
                </div>
                <div className='ButtonContainer'>
                    <Button variant='outlined' className='Button' sx={{ borderRadius: 28 }}>
                        <PeopleAltOutlinedIcon />
                    </Button>
                    Participants
                </div>
                <div className='ButtonContainer'>
                    <Button variant='outlined' className='Button' onClick={switchSave} sx={{ borderRadius: 28 }}>
                        {!saveActivated ? <FiberManualRecordOutlinedIcon /> : <StopCircleIcon />}
                    </Button>
                    {!saveActivated ? <div>Start Recording</div> : <div>Stop Recording</div>}
                </div>
            </div>

            <div className='DashboardButtonsRow'>
                <div className='ButtonContainer'>
                    <Button variant='outlined' className='Button' sx={{ borderRadius: 28 }}>
                        <CameraswitchOutlinedIcon />
                    </Button>
                    Visualize Camera output
                </div>
                <div className='ButtonContainer'>
                    <Button variant='outlined' className='Button' sx={{ borderRadius: 28 }}>
                        <ForumOutlinedIcon />
                    </Button>
                    Chat
                </div>
                <div className='ButtonContainer'>
                    <SliderComponent />
                </div>
                <div className='ButtonContainer'>
                    <Button variant='contained' className='Button' color='error' sx={{ borderRadius: 28 }}>
                        <ExitToAppOutlinedIcon />
                    </Button>
                    Disconnect
                </div>
            </div>

            <div className='DashboardButtonsRow'></div>
        </div>
    );
};

export default DashboardButtonsComponent;

import React, { FunctionComponent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import SliderComponent from './SliderComponent';
import '../css/DashboardButtonsComponent.css';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import Popup from 'reactjs-popup';

const DashboardButtonsComponent: FunctionComponent = () => {
    const navigate = useNavigate();
    const disconnect = (): void => {
        navigate({ pathname: '/' }, { replace: true });
    };

    return (
        <div className='DashboardButtons'>
            <div className='ButtonContainer'>
                <SliderComponent />
            </div>
            <div className='ButtonContainer'>
                <Popup
                    trigger={
                        <Button variant='contained' className='Button' color='error' sx={{ borderRadius: 28 }}>
                            <ExitToAppOutlinedIcon />
                            Disconnect
                        </Button>
                    }
                    modal
                >
                    {(close: any) => (
                        <div className='modal'>
                            <Button className='close' onClick={close}>
                                &times;
                            </Button>
                            <div className='header'>
                                {' '}
                                <h2> Disconnection </h2>
                            </div>
                            <div className='content'>
                                <h3>
                                    If you confirm your disconnection, you will leave the room and be redirected to the
                                    home page.
                                </h3>
                            </div>
                            <div className='actions'>
                                <Button variant='contained' color='error' onClick={disconnect}>
                                    Leave the room
                                </Button>
                                <Button variant='contained' onClick={close}>
                                    Stay in the room
                                </Button>
                            </div>
                        </div>
                    )}
                </Popup>
            </div>
        </div>
    );
};

export default DashboardButtonsComponent;

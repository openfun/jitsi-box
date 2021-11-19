import { Box, Button } from '@mui/material';
import React, { FunctionComponent, useState, ChangeEvent, useRef } from 'react';
import '../css/JoinMeetingComponent.css';
import 'react-simple-keyboard/build/css/index.css';

interface InputRoom {
    domain: string;
    roomName: string;
}

const QrCodeComponent: FunctionComponent = () => {
    return <div className='JoinMeetingComponent'>qr</div>;
};

export default QrCodeComponent;

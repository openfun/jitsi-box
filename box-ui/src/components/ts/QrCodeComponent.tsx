import { Box, Button } from '@mui/material';
import React, { FunctionComponent, useState, ChangeEvent, useRef } from 'react';
import '../css/QrCodeComponent.css';
import 'react-simple-keyboard/build/css/index.css';
import QRCode from 'react-qr-code';

interface InputRoom {
    domain: string;
    roomName: string;
}

const QrCodeComponent: FunctionComponent = () => {
    return (
        <div className='qrCodeContainer'>
            <div>test</div>
            <div> information</div>
        </div>
    );
};

export default QrCodeComponent;

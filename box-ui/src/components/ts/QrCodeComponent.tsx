import { Box, Button } from '@mui/material';
import React, { FunctionComponent, useState, ChangeEvent, useRef } from 'react';
import '../css/QrCodeComponent.css';
import 'react-simple-keyboard/build/css/index.css';
import QRCode from 'react-qr-code';

interface InputRoom {
    domain: string;
    roomName: string;
}

const QrCodeComponent: FunctionComponent<InputRoom> = ({ domain: domain, roomName: roomName }) => {
    return (
        <div className='qrCodeContainer'>
            <div className='QRItem'>
                <QRCode value={`https://${domain}/${roomName}`} size={320} />
            </div>
            <div className='DetailsContainer'> information</div>
        </div>
    );
};

export default QrCodeComponent;

import React, { FunctionComponent } from 'react';
import '../css/QrCodeComponent.css';
import 'react-simple-keyboard/build/css/index.css';
import QRCode from 'react-qr-code';
import QrCodeIcon from '@mui/icons-material/QrCode';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Button } from '@mui/material';
import { InputRoomWithClose } from '../../types';

const QrCodeComponent: FunctionComponent<InputRoomWithClose> = (props: InputRoomWithClose) => {
    return (
        <div className='qrCodeContainer'>
            <div className='QRItem'>
                <QRCode value={`https://${props.domain}/${props.roomName}`} size={210} />
            </div>
            <div className='DetailsContainer'>
                <div className='ParagraphContainer'>
                    <div>
                        <QrCodeIcon style={{ height: '35px', width: '35px' }} />
                    </div>
                    <div className='ParagraphItem'>
                        <p>
                            En flashant ce QR code, vous pouvez ajouter facilement une caméra à la conférence avec votre
                            smartphone ou envoyer l&apos;adresse de la conférence à un participant.
                        </p>
                    </div>
                </div>
                <div className='ParagraphContainer'>
                    <div>
                        <PhoneIphoneIcon style={{ height: '35px', width: '35px' }} />
                    </div>
                    <div className='ParagraphItem'>
                        <p>
                            <strong>Tip:</strong> pensez à utiliser votre smartphone pour le Chat ou pour partager le QR
                            code
                        </p>
                    </div>
                </div>
            </div>
            <div className='CloseButton'>
                <Button aria-label='close' onClick={props.close}>
                    <HighlightOffIcon style={{ height: '50px', width: '50px' }} />
                </Button>
            </div>
        </div>
    );
};

export default QrCodeComponent;

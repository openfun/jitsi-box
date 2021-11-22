import React, { FunctionComponent } from 'react';
import '../css/QrCodeComponent.css';
import 'react-simple-keyboard/build/css/index.css';
import QRCode from 'react-qr-code';
import QrCodeIcon from '@mui/icons-material/QrCode';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
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
                            <strong>Astuce:</strong> pensez à utiliser votre smartphone pour le Chat ou pour partager le
                            QR code
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QrCodeComponent;

import React, { FunctionComponent } from 'react';
import '../css/QrCodeComponent.css';
import 'react-simple-keyboard/build/css/index.css';
import QRCode from 'react-qr-code';
import QrCodeIcon from '@mui/icons-material/QrCode';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Button } from '@mui/material';
import { InputRoomWithClose } from '../../utils/Props';
import { useTranslation } from 'react-i18next';

const QrCodeComponent: FunctionComponent<InputRoomWithClose> = (props: InputRoomWithClose) => {
    const { t } = useTranslation();
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
                        <p>{t('qrCodeDescription')}</p>
                    </div>
                </div>
                <div className='ParagraphContainer'>
                    <div>
                        <PhoneIphoneIcon style={{ height: '35px', width: '35px' }} />
                    </div>
                    <div className='ParagraphItem'>
                        <p>
                            <strong>{t('tip')}:</strong> {t('tipDescription')}
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

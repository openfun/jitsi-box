import React, { FunctionComponent, useState, useEffect } from 'react';
import QrReader from 'react-qr-reader';
import axios from 'axios';
import { Button } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import '../css/QrCodeScanner.css';
import { ConnectionProps } from '../../utils/Props';
import { useTranslation } from 'react-i18next';

const verifyJitsiScript = (url: string) =>
    new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.onload = resolve;
        script.onerror = reject;
    });

const QrCodeScanner: FunctionComponent<ConnectionProps> = (props: ConnectionProps) => {
    const { t } = useTranslation();
    const [qrCodeScannedValue, setQrCodeScannedValue] = useState('');
    // QR Code Tab
    const handleScan = (data: string | null) => {
        if (data) setQrCodeScannedValue(data);
    };
    const handleError = (err: Error) => {
        console.error(err);
    };
    useEffect(() => {
        if (qrCodeScannedValue.length > 0) {
            const decomposedScannedValue = qrCodeScannedValue.split('/');
            console.log(decomposedScannedValue);
            verifyJitsiScript(`https://${decomposedScannedValue[2]}/external_api.js`)
                .then((response) => {
                    console.log('response');
                    props.setInformation({ domain: decomposedScannedValue[2], roomName: decomposedScannedValue[3] });
                    props.close();
                })
                .catch((err) => {
                    console.log(err);
                    setQrCodeScannedValue('');
                });
        }
    }, [qrCodeScannedValue, setQrCodeScannedValue]);
    return (
        <div className='QrCodeScannerComponent'>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    textAlign: 'center',
                    width: '100%',
                    height: '50%',
                    marginTop: '5px',
                    marginBottom: '5px',
                }}
            >
                <div style={{ width: '50%', height: '50%' }}>
                    <strong> {t('qrCodeScanner')}</strong>
                    <QrReader delay={300} onError={handleError} onScan={handleScan} />
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
export default QrCodeScanner;

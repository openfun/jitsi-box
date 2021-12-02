import React, { FunctionComponent, useState } from 'react';
import QrReader from 'react-qr-reader';
import CallMissedOutgoingRoundedIcon from '@mui/icons-material/CallMissedOutgoingRounded';
import { styled } from '@mui/material/styles';
import MuiGrid from '@mui/material/Grid';
import { Button } from '@mui/material';
import '../css/QrCodeScanner.css';
import { ConnectionProps } from '../../types';

const Grid = styled(MuiGrid)(({ theme }) => ({
    width: '100%',
    ...theme.typography.body2,
    '& [role="separator"]': {
        margin: theme.spacing(0, 2),
    },
}));

const QrCodeScanner: FunctionComponent<ConnectionProps> = (props: ConnectionProps) => {
    const [qrCodeScannedValue, setQrCodeScannedValue] = useState('');
    // QR Code Tab
    const handleScan = (data: string | null) => {
        console.log(data);
        if (data) setQrCodeScannedValue(data);
    };
    const handleError = (err: Error) => {
        console.error(err);
    };
    const submitRoomChangeFromQRCode = (): void => {
        const decomposedScannedValue = qrCodeScannedValue.split('/');
        props.setInformation({ domain: decomposedScannedValue[2], roomName: decomposedScannedValue[3] });
        props.close();
    };
    return (
        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
            <div style={{ width: '50%' }}>
                <QrReader delay={300} onError={handleError} onScan={handleScan} />
            </div>
            {qrCodeScannedValue.length > 0 ? (
                <div className='qrScanContained'>
                    <div>
                        <Grid container style={{ border: '1px solid ', borderRadius: '15px' }}>
                            <Grid item>
                                <p
                                    style={{
                                        marginLeft: '15px',
                                        overflowWrap: 'break-word',
                                        wordWrap: 'break-word',
                                        fontSize: '25px',
                                    }}
                                >
                                    <strong>Domaine:</strong> {qrCodeScannedValue.split('/')[2]}
                                </p>
                            </Grid>
                            <Grid item>
                                <p
                                    style={{
                                        marginLeft: '15px',
                                        overflowWrap: 'break-word',
                                        wordWrap: 'break-word',
                                        fontSize: '25px',
                                    }}
                                >
                                    <strong>Nom:</strong> {qrCodeScannedValue.split('/')[3]}{' '}
                                </p>
                            </Grid>
                        </Grid>
                    </div>
                    <div className='JoinMeetingButton'>
                        <Button
                            color='primary'
                            variant='contained'
                            onClick={submitRoomChangeFromQRCode}
                            startIcon={<CallMissedOutgoingRoundedIcon />}
                        >
                            Joindre la réunion
                        </Button>
                    </div>
                </div>
            ) : null}
        </div>
    );
};
export default QrCodeScanner;

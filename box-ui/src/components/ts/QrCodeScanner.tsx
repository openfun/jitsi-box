import React, { FunctionComponent, useState } from 'react';
import QrReader from 'react-qr-reader';
import CallMissedOutgoingRoundedIcon from '@mui/icons-material/CallMissedOutgoingRounded';
import { styled } from '@mui/material/styles';
import MuiGrid from '@mui/material/Grid';
import { Button } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import '../css/QrCodeScanner.css';
import { ConnectionProps } from '../../utils/Props';

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
        <div className='QrCodeScannerComponent'>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', width: '100%', height: '100%' }}>
                <div style={{ width: '50%', marginLeft: '2%', marginTop: '2%' }}>
                    <QrReader delay={300} onError={handleError} onScan={handleScan} />
                </div>
                <div className='QrScanContained'>
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
                                    <strong>Domain:</strong>{' '}
                                    {qrCodeScannedValue.length > 0 ? <>{qrCodeScannedValue.split('/')[2]} </> : null}
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
                                    <strong>Name:</strong>{' '}
                                    {qrCodeScannedValue.length > 0 ? <>{qrCodeScannedValue.split('/')[3]} </> : null}
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
                            disabled={qrCodeScannedValue.length === 0}
                        >
                            Join the room
                        </Button>
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
export default QrCodeScanner;

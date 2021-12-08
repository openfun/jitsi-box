import React, { useState, MouseEvent, FunctionComponent } from 'react';
import Popover from '@mui/material/Popover';
import { Button } from '@mui/material';
import ScreenShareRoundedIcon from '@mui/icons-material/ScreenShareRounded';
import SettingsInputAntennaIcon from '@mui/icons-material/SettingsInputAntenna';
import QrCodeScannerRoundedIcon from '@mui/icons-material/QrCodeScannerRounded';
import '../css/PopupComponent.css';
import ConnectionComponent from './ConnectionComponent';
import QrCodeComponent from './QrCodeComponent';
import ButtonGroup from '@mui/material/ButtonGroup';
import { RoomProps } from '../../utils/Props';
import FormJoinMeeting from './FormJoinMeeting';
import QrCodeScanner from './QrCodeScanner';
import { useTranslation } from 'react-i18next';

const PopupComponent: FunctionComponent<RoomProps> = (props: RoomProps) => {
    const { t } = useTranslation();

    const [joinMeetingDisplayed, setJoinMeetingDisplayed] = useState<boolean>(false);
    const [qrCodeDisplayed, setQrCodeDisplayed] = useState<boolean>(false);
    const [qrCodeScannerDisplayed, setQrCodeScannedDisplayed] = useState<boolean>(false);
    const [antennaDisplayed, setAntennaDisplayed] = useState<boolean>(false);

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [popNumber, setPopNumber] = useState<number>(-1);

    const handleClick = (event: MouseEvent<HTMLButtonElement>, position: number) => {
        if (position === 1) {
            setJoinMeetingDisplayed(true);
        }
        if (position === 2) {
            setQrCodeScannedDisplayed(true);
        }
        if (position === 3) {
            setQrCodeDisplayed(true);
        }
        if (position === 4) {
            setAntennaDisplayed(true);
        }
        setAnchorEl(event.currentTarget);
        setPopNumber(position);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setPopNumber(-1);
        setQrCodeScannedDisplayed(false);
        setJoinMeetingDisplayed(false);
        setQrCodeDisplayed(false);
        setAntennaDisplayed(false);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div className='HeaderContainer'>
            <ButtonGroup aria-label='outlined primary button group' size='large'>
                <Button
                    className='meetingUrl'
                    style={{
                        justifyContent: joinMeetingDisplayed ? 'center' : 'flex-start',
                        color: '#035ccd',
                        backgroundColor: '#D9E7F7',
                        overflowWrap: 'break-word',
                        overflowX: 'visible',
                        overflowY: 'hidden',
                    }}
                    variant='outlined'
                    onClick={(event: MouseEvent<HTMLButtonElement>) => handleClick(event, 1)}
                >
                    <h4>
                        {!joinMeetingDisplayed
                            ? `https://${props.information.domain}/${props.information.roomName}`
                            : t('editRoomAndDomain')}
                    </h4>
                </Button>
                <Button
                    className='QrcodeScannerButton'
                    variant={qrCodeScannerDisplayed ? 'contained' : 'outlined'}
                    onClick={(event: MouseEvent<HTMLButtonElement>) => handleClick(event, 2)}
                >
                    <QrCodeScannerRoundedIcon style={{ height: '30px', width: '30px' }} />
                </Button>
                <Button
                    className='QrcodeButton'
                    variant={qrCodeDisplayed ? 'contained' : 'outlined'}
                    onClick={(event: MouseEvent<HTMLButtonElement>) => handleClick(event, 3)}
                >
                    <ScreenShareRoundedIcon style={{ height: '30px', width: '30px' }} />
                </Button>
                <Button
                    className='OpenTopBarButton'
                    variant={antennaDisplayed ? 'contained' : 'outlined'}
                    onClick={(event: MouseEvent<HTMLButtonElement>) => handleClick(event, 4)}
                >
                    <SettingsInputAntennaIcon style={{ height: '30px', width: '30px' }} />
                </Button>
            </ButtonGroup>
            <Popover
                id={id}
                open={open}
                className='Popover'
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                sx={{
                    '& .MuiPopover-paper': {
                        display: 'flex',
                        alignItems: 'stretch',
                        minWidth: 'calc(100% - 32px)',
                        minHeight: 'calc(100% - 64px)',
                    },
                }}
            >
                {popNumber === 1 ? (
                    <FormJoinMeeting
                        close={handleClose}
                        setInformation={props.setInformation}
                        information={props.information}
                    />
                ) : null}
                {popNumber === 2 ? <QrCodeScanner close={handleClose} setInformation={props.setInformation} /> : null}
                {popNumber === 3 ? (
                    <QrCodeComponent
                        close={handleClose}
                        domain={props.information.domain}
                        roomName={props.information.roomName}
                    />
                ) : null}
                {popNumber === 4 ? (
                    <ConnectionComponent close={handleClose} setInformation={props.setInformation} />
                ) : null}
            </Popover>
        </div>
    );
};

export default PopupComponent;

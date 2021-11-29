import { Box, Button } from '@mui/material';
import React, { FunctionComponent, useState } from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import { StyledEngineProvider } from '@mui/material/styles';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import '../css/JoinMeetingComponent.css';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import QrReader from 'react-qr-reader';
import CallMissedOutgoingRoundedIcon from '@mui/icons-material/CallMissedOutgoingRounded';
import { styled } from '@mui/material/styles';
import MuiGrid from '@mui/material/Grid';

const Grid = styled(MuiGrid)(({ theme }) => ({
    width: '100%',
    ...theme.typography.body2,
    '& [role="separator"]': {
        margin: theme.spacing(0, 2),
    },
}));

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
};

const a11yProps = (index: number) => {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
};
interface InputRoom {
    domain: string;
    roomName: string;
}

interface RoomProps {
    information: InputRoom;
    setInformation: (value: InputRoom) => void;
    close: () => void;
}

const REGEX = new RegExp(/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/);

const JoinMeetingComponent: FunctionComponent<RoomProps> = (props: RoomProps) => {
    const [domain, setDomain] = useState<string>(props.information.domain);
    const [roomName, setRoomName] = useState<string>('');
    const [layoutName, setLayoutName] = useState('default');
    const [inputName, setInputName] = useState('default');
    const [tabActivate, setTabActive] = React.useState<number>(0);
    const [qrCodeScannedValue, setQrCodeScannedValue] = useState('');

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabActive(newValue);
    };
    // Input tab
    const submitRoomChange = (): void => {
        props.setInformation({ domain: domain, roomName: roomName });
        props.close();
    };
    const handleShift = () => {
        const newLayoutName = layoutName === 'default' ? 'shift' : 'default';
        setLayoutName(newLayoutName);
    };
    const onKeyPress = (button: string): void => {
        if (button === '{shift}' || button === '{lock}') handleShift();
    };
    const onChangeAll = (inputRoom: InputRoom) => {
        if (inputName === 'domain') {
            setDomain(inputRoom.domain);
        } else {
            setRoomName(inputRoom.roomName);
        }
    };
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
        <StyledEngineProvider injectFirst>
            {
                <Box sx={{ bgcolor: 'background.paper', width: '100%' }}>
                    <Tabs
                        value={tabActivate}
                        onChange={handleChange}
                        indicatorColor='secondary'
                        variant='fullWidth'
                        aria-label='full width tabs example'
                    >
                        <Tab label='Entrez le lien de la rencontre' {...a11yProps(0)} wrapped />
                        <Tab label='Scanner le QR Code de la rencontre' {...a11yProps(1)} wrapped />
                    </Tabs>
                    <TabPanel value={tabActivate} index={0}>
                        <div className='JoinMeetingComponent'>
                            <div className='JoinInputContainer'>
                                <div className='InputContainer'>
                                    <div className='RoomInput'>
                                        <div className='InputMessage DomainName'>
                                            <Box>
                                                <TextField
                                                    fullWidth
                                                    id='outlined-adornment-amount'
                                                    value={domain}
                                                    helperText='Entrez un nom de domaine jitsi valide'
                                                    onFocus={() => setInputName('domain')}
                                                    sx={{ input: { color: '#235dbc' } }}
                                                    variant='filled'
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position='start'>https://</InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            </Box>
                                        </div>
                                        <h2 style={{ marginTop: '-10px' }}>/</h2>
                                        <div className='InputMessage RoomName'>
                                            <Box>
                                                <TextField
                                                    fullWidth
                                                    id='outlined-adornment-amount'
                                                    value={roomName}
                                                    autoFocus={true}
                                                    helperText='Entrez le nom de la réunion'
                                                    onFocus={() => setInputName('roomName')}
                                                />
                                            </Box>
                                        </div>
                                    </div>
                                    <div className='JoinButton'>
                                        <Button
                                            variant='contained'
                                            fullWidth={true}
                                            onClick={submitRoomChange}
                                            disabled={roomName === '' || !REGEX.test(domain)}
                                        >
                                            Joindre la réunion
                                        </Button>
                                    </div>
                                </div>
                                <div className='KeyboardContainer'>
                                    <Keyboard
                                        inputName={inputName}
                                        layoutName={layoutName}
                                        className='Keyboard'
                                        excludeFromLayout={{
                                            default: ['?', '&', '"', "'", '%', '#'],
                                            shift: ['?', '&', '"', "'", '%', '#'],
                                        }}
                                        onChangeAll={onChangeAll}
                                        onKeyPress={onKeyPress}
                                    />
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel value={tabActivate} index={1}>
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                            <div style={{ width: '50%' }}>
                                <QrReader delay={300} onError={handleError} onScan={handleScan} />
                            </div>
                            {qrCodeScannedValue.length > 0 ? (
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignContent: 'center',
                                        width: '50%',
                                        gap: '15px',
                                    }}
                                >
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
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignContent: 'center',
                                        }}
                                    >
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
                    </TabPanel>
                    <div className='CloseButton'>
                        <Button aria-label='close' onClick={props.close}>
                            <HighlightOffIcon style={{ height: '50px', width: '50px' }} />
                        </Button>
                    </div>
                </Box>
            }
        </StyledEngineProvider>
    );
};

export default JoinMeetingComponent;

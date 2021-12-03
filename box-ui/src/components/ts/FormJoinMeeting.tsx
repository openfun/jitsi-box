import React, { FunctionComponent, useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { StyledEngineProvider } from '@mui/material/styles';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Box, Button } from '@mui/material';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import '../css/FormJoinMeeting.css';
import { Information, InformationProps } from '../../utils/Props';

const REGEX = new RegExp(/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/);
const FormJoinMeeting: FunctionComponent<InformationProps> = (props: InformationProps) => {
    const [domain, setDomain] = useState<string>(props.information.domain);
    const [roomName, setRoomName] = useState<string>('');
    const [layoutName, setLayoutName] = useState('default');
    const [inputName, setInputName] = useState('default');

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
    const onChangeAll = (inputRoom: Information) => {
        if (inputName === 'domain') {
            setDomain(inputRoom.domain);
        } else {
            setRoomName(inputRoom.roomName);
        }
    };
    return (
        <StyledEngineProvider injectFirst>
            {
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
                                            helperText='Enter a valid domain'
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
                                            helperText='Enter the name of the room'
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
                                    Join the meeting
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
                    <div className='CloseButton'>
                        <Button aria-label='close' onClick={props.close}>
                            <HighlightOffIcon style={{ height: '50px', width: '50px' }} />
                        </Button>
                    </div>
                </div>
            }
        </StyledEngineProvider>
    );
};
export default FormJoinMeeting;

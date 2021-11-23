import { Box, Button } from '@mui/material';
import React, { FunctionComponent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import FormControl from '@mui/material/FormControl';
import { StyledEngineProvider } from '@mui/material/styles';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import '../css/JoinMeetingComponent.css';
interface InputRoom {
    domain: string;
    roomName: string;
}
interface JoinMeetingProps {
    close: () => void;
    domain: string;
    roomName: string;
    setRoomName: (value: string) => void;
    setDomain: (value: string) => void;
}

const JoinMeetingComponent: FunctionComponent<JoinMeetingProps> = (props: JoinMeetingProps) => {
    const [domain, setDomain] = useState<string>(props.domain);
    const [roomName, setRoomName] = useState<string>('');
    const [layoutName, setLayoutName] = useState('default');
    const [inputName, setInputName] = useState('default');

    const submitRoomChange = (): void => {
        props.setDomain(domain);
        props.setRoomName(roomName);
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
        //console.log('inputs');
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
                                            helperText='Entrez un nom de domaine jitsi valide'
                                            onFocus={() => setInputName('domain')}
                                            sx={{ input: { color: '#235dbc' } }}
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
                                    disabled={roomName === '' || domain === ''}
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

export default JoinMeetingComponent;

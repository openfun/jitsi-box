import { Box, Button } from '@mui/material';
import React, { FunctionComponent, useState, ChangeEvent, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { StyledEngineProvider } from '@mui/material/styles';

import '../css/JoinMeetingComponent.css';
interface InputRoom {
    domain: string;
    roomName: string;
}

const JoinMeetingComponent: FunctionComponent = () => {
    const [inputs, setInputs] = useState<InputRoom>({
        domain: 'https://meeting.education',
        roomName: '',
    });
    const [layout, setLayout] = useState<string>('default');
    const [inputName, setInputName] = useState<string>('default');

    const navigate = useNavigate();
    const goToLaunchRoom = (): void => {
        navigate(
            { pathname: '/launch' },
            {
                state: { roomName: inputs.roomName, domain: inputs.domain },
                replace: true,
            },
        );
    };
    const handleShift = (): void => {
        const newLayoutName: string = layout === 'default' ? 'shift' : 'default';
        setLayout(newLayoutName);
    };
    const onKeyPress = (button: string): void => {
        if (button === '{shift}' || button === '{lock}') handleShift();
    };
    const onChangeAll = (inputs: InputRoom) => {
        setInputs({ ...inputs });
    };

    return (
        <StyledEngineProvider injectFirst>
            {
                <div className='JoinMeetingComponent'>
                    <div className='JoinInputContainer'>
                        <div className='JoinMessage'>{/*<h2>Enter the link of the Jitsi Meeting</h2>*/}</div>
                        <div className='InputContainer'>
                            <div className='RoomInput'>
                                <div className='InputMessage DomainName'>
                                    <Box>
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor='outlined-adornment-amount'>Domain</InputLabel>
                                            <OutlinedInput
                                                id='outlined-adornment-amount'
                                                label='Domain'
                                                value={inputs.domain}
                                                onFocus={() => setInputName('domain')}
                                                placeholder={'Domain'}
                                                sx={{ input: { color: '#235dbc' } }}
                                            />
                                        </FormControl>
                                    </Box>
                                </div>
                                /
                                <div className='InputMessage RoomName'>
                                    <Box>
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor='outlined-adornment-amount'>Room Name</InputLabel>
                                            <OutlinedInput
                                                id='outlined-adornment-amount'
                                                label='Room Name'
                                                value={inputs.roomName}
                                                autoFocus={true}
                                                onFocus={() => setInputName('roomName')}
                                                placeholder={'Room Name'}
                                            />
                                        </FormControl>
                                    </Box>
                                </div>
                            </div>
                            <div className='JoinButton'>
                                <Button
                                    variant='contained'
                                    fullWidth={true}
                                    onClick={goToLaunchRoom}
                                    disabled={!inputs.roomName || !inputs.domain}
                                >
                                    Join
                                </Button>
                            </div>
                        </div>
                        <div className='KeyboardContainer'>
                            <Keyboard
                                //keyboardRef={(r: MutableRefObject<undefined>) => (keyboard.current = r.current)}
                                inputName={inputName}
                                layoutName={layout}
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
            }
        </StyledEngineProvider>
    );
};

export default JoinMeetingComponent;

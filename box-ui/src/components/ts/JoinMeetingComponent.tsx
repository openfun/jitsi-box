import { Box, Button } from '@mui/material';
import React, { FunctionComponent, useState, useRef, ChangeEvent, MutableRefObject } from 'react';
import '../css/JoinMeetingComponent.css';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import HeaderComponent from './HeaderComponent';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const JoinMeetingComponent: FunctionComponent = () => {
    const [roomName, setRoomName] = useState('');
    const [domain, setDomain] = useState('');
    const [layout, setLayout] = useState('default');
    const keyboard = useRef();

    const onChange = (input: string): void => {
        setRoomName(input);
    };

    const handleShift = (): void => {
        const newLayoutName = layout === 'default' ? 'shift' : 'default';
        setLayout(newLayoutName);
    };

    const onKeyPress = (button: string) => {
        if (button === '{shift}' || button === '{lock}') handleShift();
    };

    const joinRoom = (): void => {
        console.log('Launch Jitsi.meeting');
    };

    const onChangeInputRoomName = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
        setRoomName(event.target.value);
    };
    const onChangeInputDomain = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
        setDomain(event.target.value);
    };
    return (
        <div className='JoinMeetingComponent'>
            <div>
                <HeaderComponent homeDisplayed={true} marshaDisplayed={true} joinDisplayed={false} />
            </div>
            <div className='JoinInputContainer'>
                <div className='JoinMessage'>
                    <h2>Enter the link of the Jitsi Meeting</h2>
                </div>
                <div className='InputContainer'>
                    <div className='InputMessage'>
                        <Box>
                            <FormControl fullWidth>
                                <InputLabel htmlFor='outlined-adornment-amount'>Domain</InputLabel>
                                <OutlinedInput
                                    id='outlined-adornment-amount'
                                    value={domain}
                                    onChange={(e) => onChangeInputDomain(e)}
                                    label='Domain'
                                />
                            </FormControl>
                        </Box>
                    </div>
                    /
                    <div className='InputMessage'>
                        <Box>
                            <FormControl fullWidth>
                                <InputLabel htmlFor='outlined-adornment-amount'>Room Name</InputLabel>
                                <OutlinedInput
                                    id='outlined-adornment-amount'
                                    value={roomName}
                                    onChange={(e) => onChangeInputRoomName(e)}
                                    label='Room Name'
                                />
                            </FormControl>
                        </Box>
                    </div>
                    <div className='JoinButton'>
                        <Button
                            variant='contained'
                            size='large'
                            onClick={joinRoom}
                            disabled={roomName.length === 0 || domain.length === 0}
                        >
                            Join
                        </Button>
                    </div>
                </div>
                <div>
                    <Keyboard
                        keyboardRef={(r: MutableRefObject<undefined>) => (keyboard.current = r.current)}
                        layoutName={layout}
                        onChange={onChange}
                        onKeyPress={onKeyPress}
                    />
                </div>
            </div>
        </div>
    );
};

export default JoinMeetingComponent;

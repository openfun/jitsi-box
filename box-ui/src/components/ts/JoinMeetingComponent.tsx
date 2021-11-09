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
    const [meetingName, setMeetingName] = useState('');
    const [layout, setLayout] = useState('default');
    const keyboard = useRef();

    const onChange = (input: string): void => {
        setMeetingName(input);
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

    const onChangeInput = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
        setMeetingName(event.target.value);
    };
    return (
        <div className='JoinMeetingComponent'>
            <div>
                <HeaderComponent returnDisplayed={true} marshaDisplayed={true} />
            </div>
            <div className='JoinInputContainer'>
                <div className='JoinMessage'>
                    <h2>Enter the link of the Jitsi Meeting</h2>
                </div>
                <div className='InputContainer'>
                    <div className='InputMessage'>
                        <Box>
                            <FormControl fullWidth>
                                <InputLabel htmlFor='outlined-adornment-amount'>Room Name/URL</InputLabel>
                                <OutlinedInput
                                    id='outlined-adornment-amount'
                                    value={meetingName}
                                    onChange={(e) => onChangeInput(e)}
                                    label='Room Name'
                                />
                            </FormControl>
                        </Box>
                    </div>
                    <div className='JoinButton'>
                        <Button variant='contained' size='large' onClick={joinRoom} disabled={meetingName.length === 0}>
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

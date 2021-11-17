import { Box, Button } from '@mui/material';
import React, { FunctionComponent, useState, ChangeEvent, useRef } from 'react';
import '../css/JoinMeetingComponent.css';
import { useNavigate } from 'react-router-dom';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import HeaderComponent from './HeaderComponent';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

interface InputRoom {
    domain: string;
    roomName: string;
}

const JoinMeetingComponent: FunctionComponent = () => {
    const [inputs, setInputs] = useState<InputRoom>({
        domain: '',
        roomName: '',
    });
    const [layout, setLayout] = useState<string>('default');
    const [inputName, setInputName] = useState<string>('default');
    //const keyboardRef = useRef(null) as React.MutableRefObject<null | Keyboard>;

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

    const onChangeRoomName = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const inputVal = event.target.value;

        setInputs({
            ...inputs,
            roomName: inputVal,
        });
        //keyboardRef?.current?.setInput(event.target.value as string);
    };
    const onChangeDomain = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const inputVal = event.target.value;
        setInputs({
            ...inputs,
            domain: inputVal,
        });
        //keyboardRef.current.setInput(event.target.value as string);
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
                    https://
                    <div className='InputMessage'>
                        <Box>
                            <FormControl fullWidth>
                                <InputLabel htmlFor='outlined-adornment-amount'>Domain</InputLabel>
                                <OutlinedInput
                                    id='outlined-adornment-amount'
                                    label='Domain'
                                    value={inputs.domain}
                                    onChange={onChangeDomain}
                                    onFocus={() => setInputName('domain')}
                                    placeholder={'Domain'}
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
                                    label='Room Name'
                                    value={inputs.roomName}
                                    onChange={onChangeRoomName}
                                    onFocus={() => setInputName('roomName')}
                                    placeholder={'Room Name'}
                                />
                            </FormControl>
                        </Box>
                    </div>
                    <div className='JoinButton'>
                        <Button
                            variant='contained'
                            size='large'
                            onClick={goToLaunchRoom}
                            disabled={!inputs.roomName || !inputs.domain}
                        >
                            Join
                        </Button>
                    </div>
                </div>
                <div>
                    <Keyboard
                        //keyboardRef={(r: MutableRefObject<undefined>) => (keyboard.current = r.current)}
                        inputName={inputName}
                        layoutName={layout}
                        onChangeAll={onChangeAll}
                        onKeyPress={onKeyPress}
                    />
                </div>
            </div>
        </div>
    );
};

export default JoinMeetingComponent;

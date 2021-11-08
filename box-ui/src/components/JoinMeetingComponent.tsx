import { Box, Button } from '@mui/material';
import {FunctionComponent, useState, useRef} from 'react';
import './JoinMeetingComponent.css'
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import MarshaComponent from './MarshaComponent';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const JoinMeetingComponent: FunctionComponent = () => {

    const [meetingName, setMeetingName] = useState('');
    const [layout, setLayout] = useState('default');
    const keyboard = useRef();

    const onChange = (input: any) => {
        setMeetingName(input);
    };

    const handleShift = () => {
        const newLayoutName = layout === 'default' ? 'shift' : 'default';
        setLayout(newLayoutName);
    };

  const onKeyPress = (button: any) => {
    if (button === "{shift}" || button === "{lock}") handleShift();
  };

  const joinRoom = () => {
    console.log('Launch Jitsi');
  }

  const onChangeInput = (event: any) => {
    setMeetingName(event.target.value);  
  };
    return (
        <div className='JoinMeetingComponent'>
            <div>
        <MarshaComponent />
        </div>
        <div className='JoinInputContainer'>
            <div className='JoinMessage'>
                <h2>Enter the link of the Jitsi Meeting</h2>
            </div>
            <div className='InputContainer'>
                <div className='InputMessage'>
                    <Box>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="outlined-adornment-amount">Room Name/URL</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-amount"
                                value={meetingName}
                                onChange={onChangeInput}
                                label="Room Name"
                            />
                        </FormControl>
                    </Box>
                </div>
                <div className="JoinButton"> 
                    <Button variant="contained" size="large" onClick={joinRoom} disabled={meetingName.length===0}>Join</Button>
                </div>
            </div>
            <div>
            <Keyboard
                keyboardRef={(r:any) => (keyboard.current = r)}
                layoutName={layout}
                onChange={onChange}
                onKeyPress={onKeyPress}
            />
            </div>
        </div>
        </div>
      );
}

export default JoinMeetingComponent;
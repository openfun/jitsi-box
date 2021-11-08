import { Box, Button, TextField } from '@mui/material';
import * as React from 'react';
import './JoinMeetingComponent.css';
import HeaderComponent from './HeaderComponent';

const JoinMeetingComponent = () => {
    return (
        <div className='JoinMeetingComponent'>
            <div>
                <HeaderComponent />
            </div>
            <div className='JoinInputContainer'>
                <div>
                    <h2>Enter the link of the Jitsi Meeting</h2>
                </div>
                <div className='InputContainer'>
                    <div>
                        <Box>
                            <TextField fullWidth label='Meeting link' id='fullWidth' />
                        </Box>
                    </div>
                    <div>
                        <Button variant='outlined'>Join</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JoinMeetingComponent;

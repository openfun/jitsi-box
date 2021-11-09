import * as React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import './CreateMeetingComponent.css';
import HeaderComponent from './HeaderComponent';
const CreateMeetingComponent = () => {
    return (
        <div className='CreateMeetingComponent'>
            <div>
                <HeaderComponent />
            </div>
            <div className='CreateMeetingContainer'>
                <div className='CreateMessage'>
                    <div>
                        <h1>Here is your Jitisi Link</h1>
                    </div>
                    <div>
                        <Link to={'meeting.education/test'}>meeting.education/test</Link>
                    </div>
                </div>
                <div className='ButtonContainer'>
                    <div>
                        <Button variant='contained' className='Button' component={Link} to='/create'>
                            Go
                        </Button>
                    </div>
                    <div>
                        <Link to={''}>I prefer enter the link by myself</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateMeetingComponent;

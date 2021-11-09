import React, { useState, FunctionComponent } from 'react';
import { Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import './CreateMeetingComponent.css';
import HeaderComponent from './HeaderComponent';

const CreateMeetingComponent: FunctionComponent = () => {
    const data = useLocation();

    const [linkRoom, setLinkRoom] = useState(
        data.state && data.state.link ? data.state.link : 'meeting.education/test',
    );
    const navigate = useNavigate();

    const goToJoinRoute = (): void => {
        navigate({ pathname: '/join' }, { replace: true });
    };
    return (
        <div className='CreateMeetingComponent'>
            <div>
                <HeaderComponent returnDisplayed={true} marshaDisplayed={true} />
            </div>
            <div className='CreateMeetingContainer'>
                <div className='CreateMessage'>
                    <div>
                        <h1>Here is your Jitisi Link</h1>
                    </div>
                    <div>
                        <h4>{linkRoom}</h4>
                    </div>
                </div>
                <div className='CreateButtonContainer'>
                    <div>
                        <Button variant='contained' size='large'>
                            Go
                        </Button>
                    </div>
                    <div className='BackToJoin'>
                        <Button variant='outlined' onClick={goToJoinRoute}>
                            I prefer to enter the link by myself
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateMeetingComponent;

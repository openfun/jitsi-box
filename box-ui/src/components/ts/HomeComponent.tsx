import React, { FunctionComponent, useState, useEffect } from 'react';
import HomeButtonsComponent from './HomeButtonsComponent';
import '../css/HomeComponent.css';
import JitsiBoxLogo from '../../logo/jitsibox.svg';
import { useLocation } from 'react-router-dom';

const HomeComponent: FunctionComponent = () => {
    const data = useLocation();
    const [counter, setCounter] = useState(data.state && data.state.count ? data.state.count : 0);
    console.log(data.state);
    const [information] = useState({
        roomName: data.state && data.state.roomName ? data.state.roomName : '',
        domain: data.state && data.state.domain ? data.state.domain : '',
    });
    console.log(counter);

    useEffect(() => {
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    }, [counter]);

    return (
        <div className='HomeButtonsContainer'>
            <div className='LogoContainer'>
                <img src={JitsiBoxLogo} alt='logo de la jitsi-box' className='logo' />
            </div>
            <HomeButtonsComponent counter={counter} roomName={information.roomName} domain={information.domain} />
        </div>
    );
};

export default HomeComponent;

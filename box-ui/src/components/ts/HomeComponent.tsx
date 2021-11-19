import React, { FunctionComponent, useState, useEffect } from 'react';
import HomeButtonsComponent from './HomeButtonsComponent';
import '../css/HomeComponent.css';
import JitsiBoxLogo from '../../logo/jitsibox.svg';
import { useLocation } from 'react-router-dom';

const HomeComponent: FunctionComponent = () => {
    const [counter, setCounter] = useState(0);

    const { state } = useLocation();
    const { count } = state != null ? state : 0;

    useEffect(() => {
        setCounter(count);
    }, [count]);

    useEffect(() => {
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    }, [counter]);

    return (
        <div className='HomeButtonsContainer'>
            <div className='LogoContainer'>
                <img src={JitsiBoxLogo} alt='logo de la jitsi-box' className='logo' />
            </div>
            <HomeButtonsComponent counter={counter} />
        </div>
    );
};

export default HomeComponent;

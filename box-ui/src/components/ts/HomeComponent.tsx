import React, { FunctionComponent } from 'react';
import HomeButtonsComponent from './HomeButtonsComponent';
import '../css/HomeComponent.css';
import JitsiBoxLogo from '/Users/arthurpdl/Documents/jitsi-box/box-ui/src/logo/jitsibox.svg';

const HomeComponent: FunctionComponent = () => {
    return (
        <div className='Home'>
            <div className='HomeButtonsContainer'>
                <img src={JitsiBoxLogo} alt='logo de la jitsi-box' className='logo' />
                <HomeButtonsComponent />
            </div>
        </div>
    );
};

export default HomeComponent;

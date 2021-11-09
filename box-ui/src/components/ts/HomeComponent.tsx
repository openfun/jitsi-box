import React, { FunctionComponent } from 'react';
import HeaderComponent from './HeaderComponent';
import HomeButtonsComponent from './HomeButtonsComponent';
import '../css/HomeComponent.css';

const HomeComponent: FunctionComponent = () => {
    return (
        <div className='Home'>
            <div>
                <HeaderComponent returnDisplayed={false} marshaDisplayed={true} />
            </div>
            <div className='HomeButtonsContainer'>
                <HomeButtonsComponent />
            </div>
        </div>
    );
};

export default HomeComponent;

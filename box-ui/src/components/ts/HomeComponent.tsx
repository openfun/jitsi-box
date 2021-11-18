import React, { FunctionComponent } from 'react';
import HomeButtonsComponent from './HomeButtonsComponent';
import '../css/HomeComponent.css';

const HomeComponent: FunctionComponent = () => {
    return (
        <div className='Home'>
            <div className='HomeButtonsContainer'>
                <HomeButtonsComponent />
            </div>
        </div>
    );
};

export default HomeComponent;

import React, { FunctionComponent } from 'react';
import '../css/DashboardComponent.css';
import HeaderComponent from './HeaderComponent';
import DashboardButtonsComponent from './DashboardButtonsComponent';

const DashboardComponent: FunctionComponent = () => {
    return (
        <div className='Dashboard'>
            <HeaderComponent homeDisplayed={false} marshaDisplayed={false} joinDisplayed={false} />
            <div className='DashboardButtonsContainer'>
                <DashboardButtonsComponent />
            </div>
        </div>
    );
};

export default DashboardComponent;

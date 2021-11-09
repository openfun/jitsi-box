import React, { FunctionComponent } from 'react';
import './DashboardComponent.css';
import HeaderComponent from './HeaderComponent';
import DashboardButtonsComponent from './DashboardButtonsComponent';

const DashboardComponent: FunctionComponent = () => {
    return (
        <div className='Dashboard'>
            <HeaderComponent />
            <div className='DashboardButtonsContainer'>
                <DashboardButtonsComponent />
            </div>
        </div>
    );
};

export default DashboardComponent;

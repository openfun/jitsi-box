import * as React from 'react';
import './DashboardComponent.css'
import MarshaComponent from './MarshaComponent';
import DashboardButtonsComponent from './DashboardButtonsComponent';

const DashboardComponent = () => {

    return (
        <div className='Dashboard'>   
            <MarshaComponent />
            <div className="DashboardButtonsContainer">
                <DashboardButtonsComponent />
            </div>
        </div>
      );
}

export default DashboardComponent;
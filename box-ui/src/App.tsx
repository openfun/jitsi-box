import React, { FunctionComponent } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateMeetingComponent from './components/ts/CreateMeetingComponent';
import HomeComponent from './components/ts/HomeComponent';
import JoinMeetingComponent from './components/ts/JoinMeetingComponent';
import DashboardComponent from './components/ts/DashboardComponent';

const App: FunctionComponent = () => {
    return (
        <Router>
            <div className='App'>
                <Routes>
                    <Route path='/' element={<HomeComponent />} />
                    <Route path='/join' element={<JoinMeetingComponent />} />
                    <Route path='/create' element={<CreateMeetingComponent />} />
                    <Route path='/dashboard' element={<DashboardComponent />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;

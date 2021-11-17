import React, { FunctionComponent } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateMeetingComponent from './components/ts/CreateMeetingComponent';
import HomeComponent from './components/ts/HomeComponent';
import JoinMeetingComponent from './components/ts/JoinMeetingComponent';
import DashboardComponent from './components/ts/DashboardComponent';
import MarshaLoginComponent from './components/ts/MarshaLoginComponent';

const App: FunctionComponent = () => {
    return (
        <Router>
            <div className='App'>
                <Routes>
                    <Route path='/' element={<HomeComponent />} />
                    <Route path='/login' element={<MarshaLoginComponent />} />
                    <Route path='/join' element={<JoinMeetingComponent />} />
                    <Route path='/launch' element={<CreateMeetingComponent />} />
                    <Route path='/dashboard' element={<DashboardComponent />} />
                    <Route path='/login' element={<MarshaLoginComponent />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;

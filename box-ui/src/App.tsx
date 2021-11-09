import React, { FunctionComponent } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateMeetingComponent from './components/CreateMeetingComponent';
import HomeComponent from './components/HomeComponent';
import JoinMeetingComponent from './components/JoinMeetingComponent';
import DashboardComponent from './components/DashboardComponent';
import MarshaLoginComponent from './components/MarshaLoginComponent';

const App: FunctionComponent = () => {
    return (
        <Router>
            <div className='App'>
                <Routes>
                    <Route path='/' element={<HomeComponent />} />
                    <Route path='/join' element={<JoinMeetingComponent />} />
                    <Route path='/create' element={<CreateMeetingComponent />} />
                    <Route path='/dashboard' element={<DashboardComponent />} />
                    <Route path='/login' element={<MarshaLoginComponent />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;

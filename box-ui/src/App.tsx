import React, { FunctionComponent } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import CreateMeetingComponent from './components/ts/CreateMeetingComponent';
import HomeComponent from './components/ts/HomeComponent';

const App: FunctionComponent = () => {
    return (
        <Router>
            <div className='App'>
                <Routes>
                    <Route path='/' element={<HomeComponent />} />
                    <Route path='/launch' element={<CreateMeetingComponent />} />
                    <Route path='*' element={<Navigate to='/' />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;

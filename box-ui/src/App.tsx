import React, { FunctionComponent } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import BoxHome from './components/ts/Box/BoxHome';
import BoxMeeting from './components/ts/Box/BoxMeeting';

const App: FunctionComponent = () => {
    return (
        <Router>
            <div className='App'>
                <Routes>
                    <Route path='/' element={<Navigate to='/box' />} />
                    <Route path='box'>
                        <Route index element={<BoxHome />} />
                        <Route path='meeting' element={<BoxMeeting />} />
                    </Route>
                    <Route path='*' element={<Navigate to='box' />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;

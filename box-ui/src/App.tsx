import React, { FunctionComponent } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import BoxHome from './components/ts/Box/BoxHome';
import BoxMeeting from './components/ts/Box/BoxMeeting';
import StudentHome from './components/ts/Student/StudentMeeting';
import StudentMeeting from './components/ts/Student/StudentHome';
import TeacherHome from './components/ts/Teacher/TeacherHome';
import TeacherMeeting from './components/ts/Teacher/TeacherMeeting';

const App: FunctionComponent = () => {
    return (
        <Router>
            <div className='App'>
                <Routes>
                    <Route path='/' element={<Navigate to='/student' />} />
                    <Route path='box'>
                        <Route index element={<BoxHome />} />
                        <Route path='meeting' element={<BoxMeeting />} />
                    </Route>
                    <Route path='teacher'>
                        <Route index element={<TeacherHome />} />
                        <Route path='meeting' element={<TeacherMeeting />} />
                    </Route>
                    <Route path='student'>
                        <Route index element={<StudentHome />} />
                        <Route path='meeting' element={<StudentMeeting />} />
                    </Route>
                    <Route path='*' element={<Navigate to='student' />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;

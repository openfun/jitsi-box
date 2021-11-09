import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import CreateMeetingComponent from './components/CreateMeetingComponent';
import HomeComponent from './components/HomeComponent';
import JoinMeetingComponent from './components/JoinMeetingComponent';
import DashboardComponent from './components/DashboardComponent';


const App= () => {
  return (
    <Router>
      <div className="App">
        <Routes>
              <Route path='/' element={<HomeComponent/>}/>
              <Route path='/join' element={<JoinMeetingComponent/>}/>
              <Route path='/create' element={<CreateMeetingComponent/>}/>
              <Route path='/dashboard' element={<DashboardComponent/>}/>
              
        </Routes>
      </div>
    </Router>
  );
};

export default App;

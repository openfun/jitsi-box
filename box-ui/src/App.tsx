import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import HomeComponent from './components/HomeComponent';

const App= () => {
  return (
    <Router>
      <div className="App">
        <Routes>
              <Route path='/' element={<HomeComponent/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;

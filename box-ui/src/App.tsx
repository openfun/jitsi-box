import React from 'react';
import MarshaComponent from './components/MarshaComponent';
import HomeButtonsComponent from './components/HomeButtonsComponent';

const App= () => {
  return (
    <div className="App">
      <div>
        <MarshaComponent />
      </div>
      <div className="HomeButtonsContainer">
      <HomeButtonsComponent />
      </div>
    </div>
  );
};

export default App;

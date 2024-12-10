import React from 'react';
import Header from './components/Header/Header';
import './App.css';
import FirstBlock from './components/FirstBlock/FirstBlock';
import GETBlock from './components/GETBlock/GETBlock';

const App = () => {
  return (
    <div className="App">
      <Header />
      <FirstBlock />
      <GETBlock />
    </div>
  );
};

export default App;

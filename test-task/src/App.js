import React from 'react';
import Header from './components/Header/Header';
import './App.css';
import FirstBlock from './components/FirstBlock/FirstBlock';
import GETBlock from './components/GETBlock/GETBlock';
import POSTBlock from './components/POSTBlock/POSTBlock';

const App = () => {
  return (
    <div className="App">
      <Header />
      <FirstBlock />
      <GETBlock />
      <POSTBlock />
    </div>
  );
};

export default App;

import React from 'react';
import Header from './components/Header/Header';
import './App.css';
import FirstBlock from './components/FirstBlock/FirstBlock';
import GETBlock from './components/GETBlock/GETBlock';
import { POSTBlock } from './components/POSTBlock/POSTBlock';

const App = () => {
  return (
    <div className="App">
      <div className="container">
        <Header />
        <FirstBlock />
        <div id='users'>
          <GETBlock />
        </div>
        <div id='signup'>
          <POSTBlock />
        </div>
      </div>
    </div>
  );
};

export default App;

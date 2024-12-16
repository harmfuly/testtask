import React, { Suspense } from 'react';
import Header from './components/Header/Header';
import './App.css';

const FirstBlock = React.lazy(() => import('./components/FirstBlock/FirstBlock'));
const GETBlock = React.lazy(() => import('./components/GETBlock/GETBlock'));
const POSTBlock = React.lazy(() => import('./components/POSTBlock/POSTBlock'));

const App = () => {
  return (
    <div className="App">
      <Header />
      <div className="container">
        <Suspense fallback={<div>Loading FirstBlock...</div>}>
          <FirstBlock />
        </Suspense>
        <div id="users">
          <Suspense fallback={<div>Loading GETBlock...</div>}>
            <GETBlock />
          </Suspense>
        </div>
        <div id="signup">
          <Suspense fallback={<div>Loading POSTBlock...</div>}>
            <POSTBlock />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default App;

import React, { Suspense, useRef } from 'react';
import Header from './components/Header/Header';
import './App.css';
import Loader from './components/Loader/Loader';

const FirstBlock = React.lazy(() => import('./components/FirstBlock/FirstBlock'));
const GETBlock = React.lazy(() => import('./components/GETBlock/GETBlock'));
const POSTBlock = React.lazy(() => import('./components/POSTBlock/POSTBlock'));

const App = () => {

  const getBlockRef = useRef(null);

  const handleUserAdded = () => {
    if (getBlockRef.current) {
      getBlockRef.current.refreshUsers();
    }
  };

  return (
    <div className="App">
      <Header />
      <div className="container">
        <Suspense fallback={<Loader />}>
          <FirstBlock />
        </Suspense>
        <div id="users">
          <Suspense fallback={<Loader />}>
            <GETBlock ref={getBlockRef} />
          </Suspense>
        </div>
        <div id="signup">
          <Suspense fallback={<Loader />}>
            <POSTBlock onUserAdded={handleUserAdded} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default App;

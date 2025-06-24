import React from 'react';
import './App.css';
import { useContext } from 'react';
import { LocationContext } from './contexts/LocationProvider';
import { Outlet } from 'react-router-dom';


function App() {
  const { location, error, isLoading } = useContext(LocationContext);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="App">
      <Outlet />
    </div>
  );
}

export default App;

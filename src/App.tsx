import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useContext } from 'react';
import { LocationContext } from './contexts/LocationProvider';


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
      <span>Hello</span>
      <span>{location?.lat}</span>
      <span>{location?.lang}</span>
    </div>
  );
}

export default App;

import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useContext } from 'react';
import { LocationContext } from './contexts/LocationProvider';
import DomRouter from './DomRouter';


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
      <DomRouter />
    </div>
  );
}

export default App;

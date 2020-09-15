import React from 'react';
import logo from './logo.svg';
import './App.css';
function App() {
  
   fetch('http://localhost:3002/users',{
     mode:'cors'
   })
   .then((response) => { 
  
     return response.json()})
   .then((data) => {
     console.log('Success:', data);
   })
   .catch((error) => {
     console.error('Error:', error);
   });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

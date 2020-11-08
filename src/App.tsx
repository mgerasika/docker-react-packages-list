import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Books} from "./Books";
import {Books2} from "./Books2";
import {GitHub} from "./GitHub";
import {AuthContainer} from "./AuthContainer";

function App() {
  return (
    <div className="App">
        <AuthContainer>
            <GitHub />
        </AuthContainer>

       <hr/>
      <
          Books />
      <hr/>
      <Books2 />
        <hr/>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
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

import React from 'react';
import {AuthContainer} from "./components/auth";
import { GitHub } from './components/github';

function App() {
  return (
    <div className="App">
        <AuthContainer>
          <GitHub />         
        </AuthContainer>
    </div>
  );
}

export default App;
  
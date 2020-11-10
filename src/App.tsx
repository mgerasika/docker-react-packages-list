import React from 'react';
import {AuthContainer} from "./components/auth/auth";
import { GitHub } from './components/github/github';

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
  
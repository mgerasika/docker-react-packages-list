import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloProvider } from '@apollo/client';
import { getApolloClient } from './common/apollo-client';
import { ThemeProvider } from 'react-jss';
import { customTheme } from './common/custom-theme';
import 'antd/dist/antd.css';

ReactDOM.render(
  <React.StrictMode>
      <ApolloProvider client={getApolloClient('github')}>
        <ThemeProvider theme={customTheme}>
          <App />
        </ThemeProvider>
      </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MoralisProvider } from 'react-moralis';

ReactDOM.render(
  <MoralisProvider 
    serverUrl='https://3afiuoyszv0j.usemoralis.com:2053/server' 
    appId='qzEFHQqEzz8xwSMEsrptUjnYV6pEPRMS59yoVzkv'
  >
    <App />
  </MoralisProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

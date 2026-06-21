import React from 'react';
import ReactDOM from 'react-dom/client';
// Changed path to look outside into root
import App from '../App.jsx';

ReactDOM.createRoot(
  document.getElementById('root')
).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


// src/main.jsx (أو index.js)
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // ← لا تضع Router هنا

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App /> {/* ← Router موجود بداخل App.js */}
  </React.StrictMode>
);
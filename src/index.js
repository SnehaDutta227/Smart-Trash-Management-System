import React from 'react';
import ReactDOM from 'react-dom/client';
import { initializeApp } from 'firebase/app';
import 'firebase/database';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FirebaseDataComponent from './pages/FirebaseDataComponent';
import AboutUs from './pages/AboutUs';


import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import MapWithMarker from './pages/MapWithMarker';
import Home from './pages/Home';
import Login from './pages/Login';




ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
     

      <Route path="/mymap" element={<MapWithMarker />} />
      <Route path="/login" element={<Login />} />

    </Route>
  </Routes>
</Router>

);

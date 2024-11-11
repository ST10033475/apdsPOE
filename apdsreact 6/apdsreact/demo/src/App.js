// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Recipient from './components/Recipient'; 
import MyPayments from './components/MyPayments'; 
import AllPayments from './components/AllPayments'; 
import Pay from './components/Pay'; 
import AdminLogin from './components/AdminLogin';
import { Helmet } from "react-helmet-async";
import './App.css'; 

// Code Attribution:
// Authour:guriasoft
// Link: https://guriasoft.com/server-side/node-js/npm

function App() {
  return (
    <Router>
      <Helmet>
        <meta httpEquiv="Content-Security-Policy" 
          content="default-src 'self';              
          script-src 'self' https://apis.google.com;              
          style-src 'self' 'unsafe-inline';              
          img-src 'self' * data:;"
        />
      </Helmet>
      <Routes>
        {/* Redirect from root path to /login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Define user routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/recipients" element={<Recipient />} /> 
        <Route path="/pay-portal" element={<Pay />} />
        <Route path="/my-payments" element={<MyPayments />} />
        <Route path="/all-payments" element={<AllPayments />} />

        {/* Define admin routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>
    </Router>
  );
}

export default App;

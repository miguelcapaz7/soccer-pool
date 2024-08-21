import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import CreateAccount from './components/CreateAccount';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <div className='App'>
         <Routes>
           <Route path="/createAccount" element={<CreateAccount />} />
           <Route path="/login" element={<Login />} />
           <Route path="/" element={<Navigate to="/login" />} />
         </Routes>
      </div>
    </Router>
  );
}

export default App;

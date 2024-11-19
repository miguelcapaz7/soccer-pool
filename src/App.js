import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import CreateAccount from './components/CreateAccount';
import Login from './components/Login';
import Home from './components/Home';
import Leaderboard from './components/Leaderboard';
import Rules from './components/Rules';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';

function App() {
  return (
    <Router>
      <div className='App'>
         <Routes>
           <Route path="/createAccount" element={<CreateAccount />} />
           <Route path="/login" element={<Login />} />
           <Route path="/" element={<Navigate to="/login" />} />
           <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
           <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
           <Route path="/rules" element={<ProtectedRoute><Rules /></ProtectedRoute>} />
           <Route path="/step1" element={<ProtectedRoute><Step1 /></ProtectedRoute>} />
           <Route path="/step2" element={<ProtectedRoute><Step2 /></ProtectedRoute>} />
           <Route path="/step3" element={<ProtectedRoute><Step3 /></ProtectedRoute>} />
         </Routes>
      </div>
    </Router>
  );
}

export default App;

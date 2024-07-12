import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp.js';
import Login from './components/Login.js';

function App() {
  return (
    <Router>
      <div className='App'>
         <Routes>
           <Route path="/signup" element={<SignUp />} />
           <Route path="/login" element={<Login />} />
         </Routes>
      </div>
    </Router>
  );
}

export default App;

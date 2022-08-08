import React from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import UserProvider from './providers/UserProvider';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <UserProvider>
    <Router>
      <Routes>
      <Route path='/' element={<HomePage name='deepak' />} />
      <Route path='/home' element={<HomePage name='deepak' />} />
      <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </Router>
    </UserProvider>
  );
}

export default App;

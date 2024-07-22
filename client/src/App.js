import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Signup from './Components/Signup';
import Navbar from './Components/Navbar';
import OpCom from './Components/OpCom';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';

export default function App() {

  return (
    <div>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<OpCom/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

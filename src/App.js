import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import DashBoard from './pages/DashBoard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Routing = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/dashboard" element={<DashBoard />}></Route>
    </Routes>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routing />
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;

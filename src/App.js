import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { About, DashBoard, Home, Login, PageNotFound } from './pages';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Routing = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/dashboard" element={<DashBoard />}></Route>
      <Route exact path="/about" element={<About />}></Route>
      <Route path="*" element={<PageNotFound />} />
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

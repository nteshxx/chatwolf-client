import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import DashBoard from './Components/DashBoard';
import './App.css';

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
    </BrowserRouter>
  );
}

export default App;

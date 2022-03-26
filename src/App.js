import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import DashBoard from './pages/DashBoard';
import Counter from './pages/Counter';

const Routing = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/dashboard" element={<DashBoard />}></Route>
      <Route exact path="/counter" element={<Counter/>}></Route>
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

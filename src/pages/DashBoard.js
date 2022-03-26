import { useNavigate } from 'react-router-dom';
import User from '../components/User';
import OnlineUsers from '../components/OnlineUsers';
import Conversations from '../components/Conversations';
import Search from '../components/Search';
import ChatBox from '../components/ChatBox';
import '../styles/dashboard.css';

const DashBoard = () => {
  const navigate = useNavigate();

  const logout = async () => {
    navigate('/');
  };

  return (
    <div id="main">
      <div id="glass">
        <div id="left-div">
          <User />
          <OnlineUsers />
        </div>
        <div id="mid-div">
          <h1 className="logo">
            Chat<span>Boy</span>
          </h1>
          <Search />
          <Conversations />
        </div>
        <div id="right-div">
          <ChatBox onLogout={() => logout()} />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;

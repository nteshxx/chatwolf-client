import { useNavigate } from 'react-router-dom';
import User from './User';
import OnlineUsers from './OnlineUsers';
import Conversations from './Conversations';
import Search from './Search';
import ChatBox from './ChatBox';

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

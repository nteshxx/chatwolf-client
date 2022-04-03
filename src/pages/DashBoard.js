import React, { useEffect } from 'react';
import { ChatBox, Conversations, OnlineUsers, Search, User } from '../components';
import { useSelector } from 'react-redux';
import '../styles/dashboard.css';
import { useNavigate } from 'react-router-dom';

const DashBoard = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn === false) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  return (
    <div id="main">
      <div id="glass">
        <div id="left-div">
          <User />
          <OnlineUsers />
        </div>
        <div id="mid-div">
          <h1 className="logo">
            Chat<span>Wolf</span>
          </h1>
          <Search />
          <Conversations />
        </div>
        <div id="right-div">
          <ChatBox />
        </div>
      </div>
    </div>
  );
};

export default React.memo(DashBoard);

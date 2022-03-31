import React, { useEffect } from 'react';
import User from '../components/User';
import OnlineUsers from '../components/OnlineUsers';
import Conversations from '../components/Conversations';
import Search from '../components/Search';
import ChatBox from '../components/ChatBox';

import { useSelector, useDispatch } from 'react-redux';
import { getAllConversations } from "../redux/chat.slice";

import '../styles/dashboard.css';

const DashBoard = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(getAllConversations({token}))
        .unwrap()
        .then(() => {
          console.log("getAllConversation success");
        })
        .catch(() => {
          console.log("getAllConversation error");
        });
  }, [dispatch, token]);

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

export default DashBoard;

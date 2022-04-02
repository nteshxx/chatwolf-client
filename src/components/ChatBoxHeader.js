import React from 'react';
import { useSelector } from 'react-redux';
import user from '../assets/default-user.svg';
import '../styles/chatboxHeader.css';

const ChatBoxHeader = () => {
  const { receiver } = useSelector((state) => state.message);

  return (
    <div className="chatbox-header">
      <div className="chatbox-image">
        <img src={user} alt="" />
      </div>
      <div className="chatbox-details">
        <h3>{receiver.split('-')[0]}</h3>
        <h5>Online</h5>
      </div>
    </div>
  );
};

export default ChatBoxHeader;

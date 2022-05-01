import React from 'react';
import { useSelector } from 'react-redux';
import user from '../assets/default-user.svg';
import wolf from '../assets/logo.svg';
import '../styles/chatboxHeader.css';

const ChatBoxHeader = () => {
  const { receiver, receiverAvatar, onlineUsers } = useSelector((state) => state.chat);

  return (
    <div className="chatbox-header">
      <div className="chatbox-image">
        <img src={receiver === 'Chat Wolf' ? wolf : receiverAvatar ? receiverAvatar : user} alt="" />
      </div>
      <div className="chatbox-details">
        <h3>{receiver.split('-')[0]}</h3>
        <h5>{onlineUsers.hasOwnProperty(receiver) ? 'online' : 'offline'} </h5>
      </div>
    </div>
  );
};

export default React.memo(ChatBoxHeader);

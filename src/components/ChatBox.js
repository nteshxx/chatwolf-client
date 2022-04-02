import React from 'react';
import { ChatBoxHeader, LogoutButton, MessageInput, MessageList } from '../components';
import { useSelector } from 'react-redux';
import '../styles/chatbox.css';


const ChatBox = () => {
  const { receiver } = useSelector((state) => state.message);

  return (
    <div id="chatbox">
      <LogoutButton />
      { receiver && <ChatBoxHeader /> }
      { receiver && <MessageList /> }
      { receiver && <MessageInput /> }
    </div>
  );
};

export default ChatBox;

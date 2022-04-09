import React from 'react';
import { ChatBoxHeader, LogoutButton, MessageInput, MessageList } from '../components';
import '../styles/chatbox.css';


const ChatBox = () => {

  return (
    <div id="chatbox">
      <LogoutButton />
      <ChatBoxHeader />
      <MessageList />
      <MessageInput />
    </div>
  );
};

export default ChatBox;

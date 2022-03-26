import React from 'react';
import '../styles/message.css';

const ChatMessage = ({ messageType, text, index }) => {
  return (
    <div className="message-body" id={`${messageType}`} key={index}>
      <h4>{text}</h4>
    </div>
  );
};

export default ChatMessage;

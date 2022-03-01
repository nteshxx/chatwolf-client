import React from 'react';

const ChatMessage = ({ messageType, text, index }) => {
  return (
    <div className="message-body" id={`${messageType}`} key={index}>
      <h4>{text}</h4>
    </div>
  );
};

export default ChatMessage;

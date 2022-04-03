import React from 'react';
import '../styles/message.css';

const Message = (props) => {
  const { messageType, text, index } = props;
  
  return (
    <div className="message-body" id={`${messageType}`} key={index}>
      <h4>{text}</h4>
    </div>
  );
};

export default Message;

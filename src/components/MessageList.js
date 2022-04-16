import React, { useEffect, useRef } from 'react';
import { Message } from '../components';
import { useSelector } from 'react-redux';
import '../styles/messageList.css';

const MessageList = () => {
  const { username } = useSelector((state) => state.auth);
  const { messages } = useSelector((state) => state.chat);

  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.scrollIntoView();
  }, [messages]);

  return (
    <div className="messages-list">
      {messages.map((message, index) => {
        return (
          <Message
            key={index}
            messageType={
              username.split('-')[1] === message.senderId || username === message.username ? 'sent' : 'received'
            }
            text={message.text}
            index={index}
          />
        );
      })}
      <div ref={divRef} />
    </div>
  );
};

export default MessageList;

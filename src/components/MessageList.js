import React, { useEffect, useRef } from 'react';
import { Message } from '../components';
import { useSelector, useDispatch } from 'react-redux';
import { setMessages } from '../redux/chat.slice';
import '../styles/messageList.css';

const MessageList = () => {
  const { socket, username, isLoggedIn } = useSelector((state) => state.auth);
  const { messages, chatId } = useSelector((state) => state.chat);

  const dispatch = useDispatch();
  const divRef = useRef(null);

  useEffect(() => {
    if (isLoggedIn) {
      socket.on(`${chatId}`, (data) => {
        dispatch(setMessages([...messages, data]));
      });
    }
  }, [chatId, dispatch, isLoggedIn, messages, socket]);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="messages-list">
      {messages.map((message, index) => {
        return (
          <Message
            key={index}
            messageType={
              username.split('-')[1] === message.senderId ? 'sent' : 'received'
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

export default React.memo(MessageList);

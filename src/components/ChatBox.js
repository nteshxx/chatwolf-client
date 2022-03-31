import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatMessage from './ChatMessage';
import user from '../assets/default-user.svg';
import logoutButton from '../assets/logout-button.svg';
import sendButton from '../assets/send.svg';
import attachmentButton from '../assets/attachment.svg';
import { useSelector, useDispatch } from 'react-redux';
import { sendMessage, setMessages } from "../redux/chat.slice";
import ToastService from "../utils/toast.service";
import AuthService from "../services/auth.service";
import '../styles/chatbox.css';

const ChatBox = () => {
  const { socket, token, username } = useSelector((state) => state.auth);
  const { receiver, chatId } = useSelector((state) => state.message);
  const { messages } = useSelector((state) => state.chat);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const divRef = useRef(null);
  
  const [message, setMessage] = useState('');

  useEffect(() => {
    // if someone redirects to dashboard without logging in
    try {
      socket.on( `${chatId}`, (data) => {
        dispatch(setMessages([...messages, data]));
      })
    } catch (error) {
      console.log(error);
      ToastService.error('Login Required!');
      navigate('/');
    };
    divRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [chatId, dispatch, messages, navigate, socket]);

  const onSendMessage = () => {
    dispatch(sendMessage({ token, username, chatId, message, receiver }))
      .unwrap()
      .then((data) => {
        console.log("sendMessage success");
        dispatch(setMessages([...messages, data.text]));
      })
      .catch(() => {
        console.log("sendMessage error");
      });
    setMessage('');
  };

  const handleKeyPress = (e) => {
    if(e.key === 'Enter'){
      onSendMessage();
    }
  };

  const onLogout = () => {
    AuthService.logout();
    navigate('/');
  };

  return (
    <div id="chatbox">
      <div className="chat-buttons">
        <button id="logout-button" type="button" onClick={() => onLogout()}>
          <img src={logoutButton} alt="" />
        </button>
      </div>
      <div className="chatbox-header">
        <div className="chatbox-image">
          <img src={user} alt="" />
        </div>
        <div className="chatbox-details">
          <h3>{receiver.split('-')[0]}</h3>
          <h5>Online</h5>
        </div>
      </div>
      <div className="chat-messages-container">
        {messages.map((message, index) => {
          return <ChatMessage key={index} messageType={username.split('-')[1] === message.senderId ? "sent": "received"} text={message.text} index={index}/>
        })}
        <div ref={divRef} />
      </div>
      <div className="create-message">
        <input
          type="text"
          placeholder="Type a new message..."
          required={true}
          autoComplete="off"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          onKeyPress={(e) => handleKeyPress(e)}
        />
        <button id="attachment-button" type="button">
          <img src={attachmentButton} alt="" />
        </button>
        <button
          id="send-button"
          type="button"
          onClick={() => onSendMessage()}
        >
          <img src={sendButton} alt="" />
        </button>
      </div>
    </div>
  );
};

export default ChatBox;

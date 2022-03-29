import React, { useContext, useState, useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import user from '../assets/default-user.svg';
import logoutButton from '../assets/logout-button.svg';
import sendButton from '../assets/send.svg';
import attachmentButton from '../assets/attachment.svg';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../styles/chatbox.css';

const { REACT_APP_API } = process.env;

const ChatBox = (props) => {
  const { onLogout } = props;
  const { socket, token, username } = useSelector((state) => state.auth);

  const { receiverState, messagesState, chatIdState } = useContext(UserContext);
  const [receiver] = receiverState;
  const [messages, setMessages] = messagesState;
  const [chatId] = chatIdState;
  
  const [message, setMessage] = useState('');

  const navigate = useNavigate();
  const divRef = useRef(null);

  useEffect(() => {
    try {
      socket.on( `${chatId}`, (data) => {
        console.log(data);
        setMessages([...messages, data]);
      });
    } catch (e) {
      console.log(e);
      navigate('/');
    }
    
    divRef.current.scrollIntoView({ behavior: 'smooth' });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  const sendMessage = async () => {
    const res = await axios.post(`${REACT_APP_API}/chat/send-message`, {
      senderId: await username.split('-')[1],
      receiverId: await receiver.split('-')[1],
      chatId: chatId,
      text: message,
      attachment: 'none',
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return res;
  };

  const onSendMessage = async (e) => {
    e.preventDefault();
    try {
      const res = await sendMessage();
      if (res.data.message === 'Success') {
        await setMessages([...messages, res.data.text]);
      }
    } catch (e) {
      console.log('send msg error', e);
    }
    setMessage('');
  }

  const handleKeyPress = (e) => {
    if(e.key === 'Enter'){
      onSendMessage(e);
      console.log('enter key pressed')
    }
  }

  return (
    <div id="chatbox">
      <div className="chat-buttons">
        <button id="logout-button" type="button" onClick={onLogout}>
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
          onClick={(e) => onSendMessage(e)}
        >
          <img src={sendButton} alt="" />
        </button>
      </div>
    </div>
  );
};

export default ChatBox;

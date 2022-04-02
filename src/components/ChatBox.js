import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage, LogoutButton } from '../components';
import user from '../assets/default-user.svg';
import sendButton from '../assets/send.svg';
import attachmentButton from '../assets/attachment.svg';
import { useSelector, useDispatch } from 'react-redux';
import { sendMessage, setMessages } from "../redux/chat.slice";
import '../styles/chatbox.css';

const ChatBox = () => {
  const { socket, token, username, isLoggedIn } = useSelector((state) => state.auth);
  const { receiver, chatId } = useSelector((state) => state.message);
  const { messages } = useSelector((state) => state.chat);
  
  const dispatch = useDispatch();
  const divRef = useRef(null);
  
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      socket.on( `${chatId}`, (data) => {
        dispatch(setMessages([...messages, data]));
      })
    }
    divRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [chatId, dispatch, isLoggedIn, messages, socket]);

  const onSendMessage = () => {
    if (message === '') {
      return true;
    }
    setLoading(true);
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
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if(e.key === 'Enter'){
      onSendMessage();
    }
  };

  return (
    <div id="chatbox">
      <LogoutButton />
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
          disabled={loading}
        />
        <button id="attachment-button" type="button">
          <img src={attachmentButton} alt="" />
        </button>
        <button
          id="send-button"
          type="button"
          onClick={() => onSendMessage()}
          disabled={loading}
        >
          <img src={sendButton} alt="" />
        </button>
      </div>
    </div>
  );
};

export default ChatBox;

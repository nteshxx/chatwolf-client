import React, { useState, useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import user from '../assets/default-user.svg';
import logoutButton from '../assets/logout-button.svg';
import sendButton from '../assets/send.svg';
import attachmentButton from '../assets/attachment.svg';
import { useSelector, useDispatch } from 'react-redux';
import { setMessages } from '../redux/message.slice';
import { sendMessage } from "../redux/chat.slice";
import '../styles/chatbox.css';

const ChatBox = (props) => {
  const { onLogout } = props;
  const { socket, token, username } = useSelector((state) => state.auth);
  const { receiver, messages, chatId } = useSelector((state) => state.message);
  
  const dispatch = useDispatch();
  
  const [message, setMessage] = useState('');
  const divRef = useRef(null);

  useEffect(() => {
    socket.on( `${chatId}`, (data) => {
      dispatch(setMessages([...messages, data]));
    });
    divRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [chatId, dispatch, messages, socket]);

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
          onClick={() => onSendMessage()}
        >
          <img src={sendButton} alt="" />
        </button>
      </div>
    </div>
  );
};

export default ChatBox;

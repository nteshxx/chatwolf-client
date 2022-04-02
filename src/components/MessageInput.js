import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sendMessage, setMessages } from '../redux/chat.slice';

import sendButton from '../assets/send.svg';
import attachmentButton from '../assets/attachment.svg';
import '../styles/messageInput.css';

const MessageInput = () => {
  const { token, username } = useSelector((state) => state.auth);
  const { receiver, chatId } = useSelector((state) => state.message);
  const { messages } = useSelector((state) => state.chat);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const onSendMessage = () => {
    if (message === '') {
      return true;
    }
    setLoading(true);
    dispatch(sendMessage({ token, username, chatId, message, receiver }))
      .unwrap()
      .then((data) => {
        console.log('sendMessage success');
        dispatch(setMessages([...messages, data.text]));
      })
      .catch(() => {
        console.log('sendMessage error');
      });
    setMessage('');
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSendMessage();
    }
  };

  return (
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
  );
};

export default MessageInput;

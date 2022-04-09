import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setMessages } from '../redux/chat.slice';
import sendButton from '../assets/send.svg';
import attachmentButton from '../assets/attachment.svg';
import '../styles/messageInput.css';

const MessageInput = () => {
  const { socket, username } = useSelector((state) => state.auth);
  const { messages, receiver, chatId  } = useSelector((state) => state.chat);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const onSendMessage = () => {
    if (text === '') {
      return true;
    }
    setLoading(true);
    /* sending via api call
    dispatch(sendMessage({ token, username, chatId, message, receiver }))
      .unwrap()
      .then((data) => {
        console.log('sendMessage success');
        dispatch(setMessages([...messages, data.text]));
      })
      .catch(() => {
        console.log('sendMessage error');
      });
    */

    // sending via socket channel
    const data = { username, receiver, chatId, text, attachment: null };
    socket.emit('send-new-message', data);
    dispatch(setMessages([...messages, data]));
    setText('');
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
        onChange={(e) => setText(e.target.value)}
        value={text}
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

export default React.memo(MessageInput);

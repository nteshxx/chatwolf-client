import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setMessages } from '../redux/chat.slice';
import Compressor from 'compressorjs';
import sendButton from '../assets/send.svg';
import attachmentButton from '../assets/attachment.svg';
import '../styles/messageInput.css';

const MessageInput = () => {
  const { socket, username, isLoggedIn } = useSelector((state) => state.auth);
  const { messages, receiver, chatId } = useSelector((state) => state.chat);
  const [text, setText] = useState('');
  const [media, setMedia] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  if (isLoggedIn) {
    socket.on(`${chatId}`, (data) => {
      dispatch(setMessages([...messages, data]));
    });
  }

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
    const data = { username, receiver, chatId, text, attachment: media };
    socket.emit('send-new-message', data);
    dispatch(setMessages([...messages, data]));
    setText('');
    setMedia(null);
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSendMessage();
    }
  };

  const onAttachFile = () => {
    document.getElementById('attachment').click();
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
      <button id="attachment-button" type="button" onClick={() => onAttachFile()}>
        <img src={attachmentButton} alt="" />
        <input
          style={{ display: 'none' }}
          type="file"
          id="attachment"
          name="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            new Compressor(file, {
              quality: 0.6,

              // The compression process is asynchronous,
              // which means you have to access the `result` in the `success` hook function.
              success(result) {
                const reader = new FileReader();
                reader.readAsDataURL(result);
                reader.onload = () => {
                  setMedia({
                    image: true,
                    content: reader.result,
                    name: file.name,
                  });
                  setText(file.name);
                  onSendMessage();
                };
                reader.onerror = (error) => {
                  console.log(error);
                };
              },
              error(err) {
                console.log(err.message);
              },
            });
          }}
        />
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

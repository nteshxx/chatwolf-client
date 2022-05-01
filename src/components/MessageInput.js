import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setMessages, setChats } from '../redux/chat.slice';
import Compressor from 'compressorjs';
import sendButton from '../assets/send.svg';
import attachmentButton from '../assets/attachment.svg';
import '../styles/messageInput.css';

const MessageInput = () => {
  const { socket, username, isLoggedIn } = useSelector((state) => state.auth);
  const { messages, receiver, chatId, chats } = useSelector((state) => state.chat);
  const [text, setText] = useState('');
  const [media, setMedia] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  if (isLoggedIn) {
    socket.off('new-message').on('new-message', (data) => {
      if (chatId === data.chatId) {
        dispatch(setMessages([...messages, data]));
      }

      // update chat conversations
      let tempChats = JSON.parse(JSON.stringify(chats));
      const chatIndex = tempChats.findIndex((obj) => obj._id === data.chatId);
      if (chatIndex === -1) {
        tempChats[tempChats.length] = {
          avatar: null,
          name: data.username.split('-')[0],
          text: data.text,
          timeStamp: new Date().toISOString(),
          userid: data.username.split('-')[1],
          _id: data.chatId,
          unseenMessages: 1,
        };
      } else {
        tempChats[chatIndex].text = data.text;
        tempChats[chatIndex].timeStamp = new Date().toISOString();
        if (tempChats[chatIndex].hasOwnProperty('unseenMessages') && chatId !== data.chatId) {
          tempChats[chatIndex].unseenMessages += 1;
        } else if (!tempChats[chatIndex].hasOwnProperty('unseenMessages') && chatId !== data.chatId) {
          tempChats[chatIndex].unseenMessages = 1;
        }
      }

      // sorting chats: latest on top
      dispatch(
        setChats(
          tempChats.sort((x, y) => {
            let m = new Date(x.timeStamp).getTime();
            let n = new Date(y.timeStamp).getTime();
            return n - m;
          })
        )
      );
    });
  }

  const onSendMessage = () => {
    if (text === '' || chatId === '') {
      setText('');
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

    // update chat conversations
    let tempChats = JSON.parse(JSON.stringify(chats));
    const chatIndex = tempChats.findIndex((obj) => obj._id === chatId);
    if (chatIndex === -1) {
      tempChats[tempChats.length] = {
        avatar: null,
        name: receiver.split('-')[0],
        text: text,
        timeStamp: new Date().toISOString(),
        userid: receiver.split('-')[1],
        _id: chatId,
        unseenMessages: 0,
      };
    } else {
      tempChats[chatIndex].text = text;
      tempChats[chatIndex].timeStamp = new Date().toISOString();
      tempChats[chatIndex].unseenMessages = 0;
    }

    // sorting chats: latest on top
    dispatch(
      setChats(
        tempChats.sort((x, y) => {
          let m = new Date(x.timeStamp).getTime();
          let n = new Date(y.timeStamp).getTime();
          return n - m;
        })
      )
    );
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
      <button
        id="attachment-button"
        type="button"
        onClick={() => onAttachFile()}
      >
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
              quality: 0.5,

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

export default MessageInput;

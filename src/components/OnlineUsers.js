import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setOnlineUsers } from '../redux/user.slice';
import { setReceiver, setMessages, setChatId } from '../redux/message.slice';
import '../styles/onlineusers.css';

const { REACT_APP_API } = process.env;

const OnlineUsers = () => {
  const { onlineUsers } = useSelector((state) => state.user);
  const { socket, username, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // retrieve all the online users
  socket.on('all-online-users', (users) => {
    dispatch(setOnlineUsers(users));
  });

  const generateChatId = (users) => {
    users = users.sort().map((user) => user.split('-')[1]);
    return `${users[0]}-${users[1]}`;
  }

  const getPreviousMessages = async (chatid) => {
    const res = await axios.post(`${REACT_APP_API}/chat/get-messages`, { chatId: chatid }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return res;
  };  

  const selectOnlineUser = (user) => {
    const chatid = generateChatId([username, user]);
    dispatch(setChatId(chatid));
    dispatch(setReceiver(user));
    // get previous messages
    const previousMessages = getPreviousMessages(chatid);
    // append previous messages
    try {
      if (previousMessages.data.message === 'Success') {
        dispatch(setMessages([...previousMessages.data.messages]));
      } else {
        console.log('cannot fetch previous messages');
      }
    } catch (e) {
      console.log('get prevMSG error', e);
    }
  }

  return (
    <div id="online-container">
      <h3 id="online-now">Online</h3>
      <ul id="online-users">
        {onlineUsers &&
          Object.keys(onlineUsers).map((user, index) => (
            <div key={index}>
              {user === username || (
                <li key={index} onClick={() => selectOnlineUser(user)}>
                  <div className="online-user">{user.split('-')[0]}</div>
                  <div className="new-message-count">{index}</div>
                </li>
              )}
            </div>
          ))}
      </ul>
    </div>
  );
};

export default OnlineUsers;

import React, { useEffect } from 'react';
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

  useEffect(() => {
    // retrieve all the online users
    socket.on('all-online-users', (users) => {
      dispatch(setOnlineUsers(users));
    });
  }, [dispatch, socket]);

  const getPreviousMessages = (chatid) => {
    axios.post(`${REACT_APP_API}/chat/get-messages`, { chatId: chatid }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then((response) => {
      dispatch(setMessages([...response.data.messages]));
    })
    .catch((e) => {
      console.log('get prevMSG error', e);
    });
  };

  const selectOnlineUser = (user) => {
    const participants = [username, user].sort().map((user) => user.split('-')[1]);
    const chatid = `${participants[0]}-${participants[1]}`;
    getPreviousMessages(chatid);
    dispatch(setChatId(chatid));
    dispatch(setReceiver(user));
  };

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

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOnlineUsers } from '../redux/user.slice';
import { setReceiver, setChatId } from '../redux/message.slice';
import { getPreviousMessages } from "../redux/chat.slice";
import '../styles/onlineusers.css';

const OnlineUsers = () => {
  const { onlineUsers } = useSelector((state) => state.user);
  const { socket, username, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      // retrieve all the online users
      socket.on('all-online-users', (users) => {
        dispatch(setOnlineUsers(users));
      });
    } catch {};
  }, [dispatch, socket]);

  const selectOnlineUser = (user) => {
    const participants = [username, user].sort().map((user) => user.split('-')[1]);
    const chatid = `${participants[0]}-${participants[1]}`;
    dispatch(getPreviousMessages({ chatid, token }))
      .unwrap()
      .then(() => {
        console.log("getPreviousMessages success");
      })
      .catch(() => {
        console.log("getPreviousMessages error");
      });
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

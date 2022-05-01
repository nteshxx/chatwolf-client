import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOnlineUsers, getPreviousMessages, setReceiver, setChatId } from "../redux/chat.slice";
import '../styles/onlineusers.css';

const OnlineUsers = () => {
  const { onlineUsers } = useSelector((state) => state.chat);
  const { socket, username, token, isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
    
  if (isLoggedIn) {
    // retrieve all the online users
    socket.off('all-online-users').on('all-online-users', (users) => {
      dispatch(setOnlineUsers(users));
    });
  }

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
                  {/*<div className="new-message-count">{index}</div>*/}
                </li>
              )}
            </div>
          ))}
      </ul>
    </div>
  );
};

export default OnlineUsers;

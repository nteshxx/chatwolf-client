import React, { createContext, useState } from 'react';

const UserContext = createContext();

const UserContextProvider = (props) => {
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');
  const [onlineUsers, setOnlineUsers] = useState({});
  const [receiver, setReceiver] = useState('');
  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState('');
  const [socket, setSocket] = useState('');

  const data = {
    usernameState: [username, setUsername],
    tokenState: [token, setToken],
    onlineState: [onlineUsers, setOnlineUsers],
    receiverState: [receiver, setReceiver],
    messagesState: [messages, setMessages],
    chatIdState: [chatId, setChatId],
    socketState: [socket, setSocket],
  }

  return (
    <>
      <UserContext.Provider value={data}>
        {props.children}
      </UserContext.Provider>
    </>
  );
};

export { UserContext, UserContextProvider };

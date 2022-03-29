import React, { createContext, useState } from 'react';

const UserContext = createContext();

const UserContextProvider = (props) => {
  const [receiver, setReceiver] = useState('');
  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState('');

  const data = {
    receiverState: [receiver, setReceiver],
    messagesState: [messages, setMessages],
    chatIdState: [chatId, setChatId],
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

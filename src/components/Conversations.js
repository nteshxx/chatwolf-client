import React from 'react';
import ChatCard from './ChatCard';

import { useSelector } from 'react-redux';

import '../styles/conversation.css';

const Conversations = () => {
  const { chats } = useSelector((state) => state.chat);

  return (
    <div id="chat-card-wrapper">
      {chats &&
        Object.values(chats).map((chat) => (
          <ChatCard
            key={chat._id}
            chatId={chat._id}
            userId={`${chat.name}-${chat.userid}`}
            text={chat.text}
            timeStamp={chat.timeStamp}
            total={chat.numberOfMessages}
          />
        ))}
    </div>
  );
};

export default Conversations;

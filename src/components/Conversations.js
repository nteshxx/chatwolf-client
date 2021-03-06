import React, { useEffect } from 'react';
import ChatCard from './ChatCard';
import { useSelector, useDispatch } from 'react-redux';
import { getAllConversations } from "../redux/chat.slice";
import '../styles/conversation.css';

const Conversations = () => {
  const { chats } = useSelector((state) => state.chat);
  const { token, isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getAllConversations({token}))
        .unwrap()
        .then(() => {
          console.log("getAllConversation success");
        })
        .catch(() => {
          console.log("getAllConversation error");
        });
    }
  }, [dispatch, isLoggedIn, token]);

  return (
    <div id="chat-card-wrapper">
      {chats &&
        Object.values(chats).map((chat) => (
          <ChatCard
            key={chat._id}
            chatId={chat._id}
            userId={`${chat.name}-${chat.userid}`}
            avatar={chat.avatar}
            text={chat.text}
            timeStamp={chat.timeStamp}
            unseenCount={chat.unseenMessages}
          />
        ))}
    </div>
  );
};

export default Conversations;

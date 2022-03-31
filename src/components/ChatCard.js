import React from 'react';
import avatar from '../assets/default-user.svg';

import { useDispatch, useSelector } from 'react-redux';
import { setReceiver, setChatId } from '../redux/message.slice';
import { getPreviousMessages } from "../redux/chat.slice";

import '../styles/chatcard.css';

const ChatCard = (chat) => {
  let time = new Date(chat.timeStamp).toDateString().split(' ');
  time = `${time[1]} ${time[2]}`;

  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const selectCard = (chatid, user) => {
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
    <div className="chat-card" onClick={() => selectCard(chat.chatId, chat.name)}>
      <div className="chat-card-image">
        <img src={avatar} alt="" />
      </div>
      <div className="chat-card-details">
        <h3>{chat.name}</h3>
        <h5>{chat.text}</h5>
      </div>
      <div className="date-notification">
        <h5 className="date">{time}</h5>
        <h5 className="unseen">{chat.total}</h5>
      </div>
    </div>
  );
};

export default ChatCard;

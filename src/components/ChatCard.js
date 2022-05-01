import React from 'react';
import defaultAvatar from '../assets/default-user.svg';
import { useDispatch, useSelector } from 'react-redux';
import { getPreviousMessages, setReceiver, setReceiverAvatar, setChatId } from "../redux/chat.slice";
import '../styles/chatcard.css';

const ChatCard = (props) => {
  const { chatId, userId, avatar, text, timeStamp, unseenCount } = props
  let time = new Date(timeStamp).toDateString().split(' ');
  time = `${time[1]} ${time[2]}`;

  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const selectCard = (chatid, user, userAvatar) => {
    dispatch(setChatId(chatid));
    dispatch(getPreviousMessages({ chatid, token }))
      .unwrap()
      .then(() => {
        console.log("getPreviousMessages success");
      })
      .catch(() => {
        console.log("getPreviousMessages error");
      });
    dispatch(setReceiver(user));
    dispatch(setReceiverAvatar(userAvatar));
  };

  return (
    <div className="chat-card" onClick={() => selectCard(chatId, userId, avatar)}>
      <div className="chat-card-image">
        <img src={avatar ? avatar : defaultAvatar} alt="" />
      </div>
      <div className="chat-card-details">
        <h3>{userId.split('-')[0]}</h3>
        <h5>{text}</h5>
      </div>
      <div className="date-notification">
        <h5 className="date">{time}</h5>
        {unseenCount ? <h5 className="unseen">{unseenCount}</h5> : <div></div>}
      </div>
    </div>
  );
};

export default ChatCard;

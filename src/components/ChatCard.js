import React from 'react';
import defaultAvatar from '../assets/default-user.svg';
import { useDispatch, useSelector } from 'react-redux';
import { getPreviousMessages, setReceiver, setReceiverAvatar, setChatId, setChats } from "../redux/chat.slice";
import '../styles/chatcard.css';

const ChatCard = (props) => {
  const { chatId, userId, avatar, text, timeStamp, unseenCount } = props;
  
  const lastMessageTime = new Date(timeStamp);
  const currentTime = new Date();
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const millisBetween = currentTime.getTime() - lastMessageTime.getTime();
  const days = Math.floor(millisBetween / millisecondsPerDay);

  let time = '';

  if (days === 0) {
    // show time
    time = lastMessageTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  } else if (days === 1) {
    // show Yesterday
    time = "Yesterday"
  } else {
    // show date month
    let timeArray = lastMessageTime.toLocaleString('en-US').split(',')[0];
    time = `${timeArray[1]} ${timeArray[2]}`;
  }

  const { token } = useSelector((state) => state.auth);
  const { chats } = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  const selectCard = (chatid, user, userAvatar) => {
    // set unseen messages to zero
    let tempChats = JSON.parse(JSON.stringify(chats));
    const chatIndex = tempChats.findIndex((obj) => obj._id === chatId);
    if (chatIndex !== -1) {
      tempChats[chatIndex].unseenMessages = 0;
      dispatch(setChats(tempChats));
    }
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

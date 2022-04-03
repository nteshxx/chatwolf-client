import React from 'react';
import userImage from '../assets/default-user.svg';
import { useSelector } from 'react-redux';
import '../styles/user.css';

const User = () => {
  const { username } = useSelector((state) => state.auth);

  return (
    <div id="user">
      <div className="user-img">
        <img src={userImage} alt="" />
      </div>
      <div id="user-name">{username.split('-')[0]}</div>
    </div>
  );
};

export default React.memo(User);

import React, { useContext } from 'react';
import user from '../Assets/default-user.svg';
import { UserContext } from '../Contexts/UserContext';

const User = () => {
  const { usernameState } = useContext(UserContext);
  const [username] = usernameState;

  return (
    <div id="user">
      <div className="user-img">
        <img src={user} alt="" />
      </div>
      <div id="user-name">{username.split('-')[0]}</div>
    </div>
  );
};

export default User;

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/auth.slice';
import logoutButton from '../assets/logout-button.svg';
import '../styles/logoutButton.css';

const LogoutButton = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout({ token }))
      .unwrap()
      .then((data) => {
        console.log(data.message);
      })
      .catch(() => {
        console.log('logout error chatbox');
      });
  };

  return (
    <div className="chat-buttons">
      <button id="logout-button" type="button" onClick={() => onLogout()}>
        <img src={logoutButton} alt="" />
      </button>
    </div>
  );
};

export default LogoutButton;

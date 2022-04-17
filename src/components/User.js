import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Compressor from 'compressorjs';
import userImage from '../assets/default-user.svg';
import '../styles/user.css';

const User = () => {
  const { username } = useSelector((state) => state.auth);
  const [avatar, setAvatar] = useState(userImage);
  
  const onUpdateAvatar = () => {
    document.getElementById('upload-avatar').click();
  };

  return (
    <div id="user">
      <div className="user-img" onClick={() => onUpdateAvatar()}>
        <img src={avatar} alt="" />
        <input
          style={{ display: 'none' }}
          type="file"
          id="upload-avatar"
          name="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            new Compressor(file, {
              quality: 0.6,

              // The compression process is asynchronous,
              // which means you have to access the `result` in the `success` hook function.
              success(result) {
                const reader = new FileReader();
                reader.readAsDataURL(result);
                reader.onload = () => {
                  setAvatar(reader.result);
                };
                reader.onerror = (error) => {
                  console.log(error);
                };
              },
              error(err) {
                console.log(err.message);
              },
            });
          }}
        />
      </div>
      <div id="user-name">{username.split('-')[0]}</div>
    </div>
  );
};

export default React.memo(User);

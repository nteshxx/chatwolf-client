import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { uploadAvatar } from "../redux/auth.slice";
import Compressor from 'compressorjs';
import userImage from '../assets/default-user.svg';
import '../styles/user.css';

const User = () => {
  const { username, avatar, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  
  const onUpdateAvatar = () => {
    document.getElementById('upload-avatar').click();
  };

  return (
    <div id="user">
      <div className="user-img" onClick={() => onUpdateAvatar()}>
        <img src={avatar ? avatar : userImage} alt="" />
        <input
          style={{ display: 'none' }}
          type="file"
          id="upload-avatar"
          name="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            new Compressor(file, {
              quality: 0.2,

              // The compression process is asynchronous,
              // which means you have to access the `result` in the `success` hook function.
              success(result) {
                const reader = new FileReader();
                reader.readAsDataURL(result);
                reader.onload = () => {
                  // setAvatar(reader.result);
                  dispatch(uploadAvatar({ dataUrl: reader.result, token }))
                    .unwrap()
                    .then((data) => {
                      let loggedInUser = JSON.parse(localStorage.getItem('user'));
                      loggedInUser.user.avatar = data.updatedAvatar;
                      localStorage.setItem('user', JSON.stringify(loggedInUser));
                  })
                  .catch(() => {
                    console.log('update avatar error');
                  });
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

export default User;

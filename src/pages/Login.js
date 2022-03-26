import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import art from '../assets/unlock.svg';
import axios from 'axios';
import io from 'socket.io-client';
import { UserContext } from '../contexts/UserContext';
import '../styles/login.css';

const Login = () => {
  const { usernameState, tokenState, socketState, onlineState } = useContext(UserContext);
  // eslint-disable-next-line no-unused-vars
  const [username, setUsername] = usernameState;
  // eslint-disable-next-line no-unused-vars
  const [token, setToken] = tokenState;
  // eslint-disable-next-line no-unused-vars
  const [onlineUsers, setOnlineUsers] = onlineState;
  // eslint-disable-next-line no-unused-vars
  const [socket, setSocket] = socketState;

  const navigate = useNavigate();
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [signup, setSignup] = useState(false);

  const register = async () => {
    const res = await axios.post('http://localhost:5000/auth/register', {
      name: name,
      email: email,
      password: password,
    });
    return res;
  };

  const login = async () => {
    const res = await axios.post('http://localhost:5000/auth/login', {
      email: email,
      password: password,
    });
    return res;
  };

  const loginHandler = async () => {
    try {
      const res = signup ? await register() : await login();
      console.log('res-> ', res);
      if (res.data.message === 'Success') {
        // establish socket connection with the client 
        const socketConnect = await io.connect('http://localhost:5000', {
          query: res.data.accessToken
        });
        // add user to the list of online users
        await socketConnect.emit('new-online-user', `${res.data.user.name}-${res.data.user._id}`);
        // retrieve all the online users
        await socketConnect.on('all-online-users', (users) => {
          console.log(users);
          setOnlineUsers(users);
        });

        await setUsername(`${res.data.user.name}-${res.data.user._id}`);
        await setToken(res.data.accessToken);
        await setSocket(socketConnect);
        navigate('/dashboard');
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <div id="main">
      <div id="login-glass">
        <div id="art-container">
          <h3>
            Unlock!
            <br />
            <span>the secret land of Messaging.</span>
          </h3>
          <img src={art} alt="" />
        </div>
        <div id="login-div">
          <h2 className="login-logo">
            Chat<span>Wolf</span>
          </h2>
          <form>
            {signup && (
              <div className="input-box">
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  autoComplete="off"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}
            <div className="input-box">
              <input
                type="text"
                placeholder="Email"
                name="email"
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Password"
                name="password"
                autoComplete="off"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-box">
              <button
                type="button"
                id="signin-button"
                onClick={() => loginHandler()}
              >
                {signup ? 'Sign Up' : 'Log In'}
              </button>
            </div>
            {signup || (
              <p className="forgot-password">
                <a href="/">Forgot Password?</a>
              </p>
            )}
            {signup || (
              <button
                type="button"
                id="signup-button"
                onClick={() => setSignup(!signup)}
              >
                Sign Up
              </button>
            )}
            {signup && (
              <button
                type="button"
                id="signup-button"
                onClick={() => setSignup(!signup)}
              >
                Log In
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

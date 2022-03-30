import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/auth.slice";
import art from '../assets/unlock.svg';
import '../styles/login.css';

const Login = () => {
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [signup, setSignup] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {    
    setLoading(true);

    dispatch(login({ email, password }))
      .unwrap()
      .then(() => {
        navigate("/dashboard");
      })
      .catch(() => {
        setLoading(false);
      });
  };

  if (isLoggedIn) {
    // navigate("/dashboard");
  }

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
                onClick={() => handleLogin()}
                disabled={loading}
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

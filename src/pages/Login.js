import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, register } from "../redux/auth.slice";
import { FormInput } from '../components';
import art from '../assets/unlock.svg';
import '../styles/login.css';

const Login = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [signup, setSignup] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const { name, email, password } = Object.fromEntries(data.entries());
   
    setLoading(true);
    if (signup) {
      dispatch(register({ name, email, password }))
        .unwrap()
        .then(() => {
          navigate("/dashboard");
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      dispatch(login({ email, password }))
        .unwrap()
        .then(() => {
          navigate("/dashboard");
        })
        .catch(() => {
          setLoading(false);
        });
    }
  };

  return (
    <div id="main">
      <div id="login-glass">
        <div id="art-container">
          <h3>Unlock!<br /><span>the secret land of Messaging.</span></h3>
          <img src={art} alt="" />
        </div>
        <div id="login-div">
          <h2 className="login-logo">Chat<span>Wolf</span></h2>
          <form onSubmit={handleSubmit}>
          {signup && (
              <FormInput
                type="text"
                placeholder="Name"
                name="name"
                autoComplete="off"
                pattern="^[A-Za-z ,.']{3,20}$"
              />
            )}
            <FormInput
              type="email"
              placeholder="Email"
              name="email"
              autoComplete="on"
              pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            />
            <FormInput
              type="password"
              placeholder="Password"
              name="password"
              autoComplete="on"
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$#!%*?&]{8,25}$"
            />
            <button type="submit" id="signin-button" disabled={loading}>
              {signup 
                ? <div>{loading ? <div class="loader"></div> : <div>Sign Up</div>}</div> 
                : <div>{loading ? <div class="loader"></div> : <div>Log In</div>}</div>
              }
            </button>
            {signup || (<p className="forgot-password"><a href="/">Forgot Password?</a></p>)}
            {signup || (<button type="button" id="signup-button" onClick={() => setSignup(!signup)}>Sign Up</button>)}
            {signup && (<button type="button" id="signup-button" onClick={() => setSignup(!signup)}>Log In</button>)}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

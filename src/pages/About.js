import React from 'react';
import '../styles/about.css';
import github from '../assets/github.svg';
import linkedin from '../assets/linkedin.svg';

const About = () => {
  return (
    <div className="about">
      <div className="about-container">
        <h2>Nitesh Yadav</h2>
        <p>MERN Stack Developer</p>
        <div className="links">
          <a href="https://github.com/nteshxx/chatwolf-client">
            <img src={github} alt="" />
          </a>
          <a href="https://www.linkedin.com/in/nteshxx/">
            <img src={linkedin} alt="" />
          </a>
        </div>
        <p>Thanks for visiting!</p>
      </div>
    </div>
  );
};

export default React.memo(About);

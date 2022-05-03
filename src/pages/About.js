import React from 'react';
import '../styles/about.css';
import github from '../assets/github.svg';
import linkedin from '../assets/linkedin.svg';

const About = () => {
  return (
    <div className="about">
      <h2>Nitesh Yadav</h2>
      <p>MERN Stack Developer</p>
      <div className='links'>
        <a href='https://github.com/nteshxx/file-sher-client'><img src={github} alt=''/></a>
        <a href='https://www.linkedin.com/in/nteshxx/'><img src={linkedin} alt=''/></a>
      </div>
      <p>Thanks for visiting!</p>
    </div>
  )
}

export default React.memo(About);

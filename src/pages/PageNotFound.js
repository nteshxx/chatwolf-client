import React from 'react';
import { Link } from 'react-router-dom';
import FOUR04 from '../assets/404.svg';

const PageNotFound = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <div style={{ margin: 'auto' }}>
        <img style={{ height: '60vh', margin: 'auto' }} src={FOUR04} alt="" />
      </div>
      <Link
        to="/"
        style={{
          position: 'absolute',
          top: '80%',
          textDecoration: 'none',
          fontSize: '24px',
          fontWeight: '600',
          color: 'black'
        }}
      >
        Go Back
      </Link>
    </div>
  );
};

export default PageNotFound;

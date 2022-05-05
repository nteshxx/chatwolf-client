import React from 'react';
import { Link } from 'react-router-dom';
import FOUR04 from '../assets/404.svg';

const PageNotFound = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column-reverse',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw'
      }}
    >
      <div style={{ height: '100%', width: '100%' }}>
        <img style={{ height: '100%', width: '100%', margin: 'auto' }} src={FOUR04} alt="" />
      </div>
      <Link
        to="/"
        style={{
          position: 'absolute',
          textDecoration: 'none',
          fontSize: '2rem',
          fontWeight: '600',
          color: 'black'
        }}
      >
        HOME
      </Link>
    </div>
  );
};

export default PageNotFound;

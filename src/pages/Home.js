import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion/dist/framer-motion';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';

const Section = styled.section`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: black;
  overflow: hidden;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100vh;
  @media screen and (max-width: 992px) {
    grid-template-columns: 1fr;
  }
  @media screen and (max-width: 768px) {

  }
  @media screen and (max-width: 576px) {
    
  }
  @media screen and (max-width: 280px) {
  }
`;

const ColumnLeft = styled.div`
  display: flex;
  color: white;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 7rem;
  h1 {
    margin-bottom: 0.5rem;
    font-size: 1.8rem;
    font-weight: 500;
    color: white;
  }
  p {
    margin: 3rem 0;
    font-size: 4rem;
    font-weight: 300;
    line-height: 1.5;
    color: white;
  }
  @media screen and (max-width: 576px) {
    padding: 0 3rem;
    align-items: center;
    h1 {
      margin-bottom: 0;
      font-size: 1.4rem;
    }
    p {
      margin: 1rem 0;
      font-size: 3rem;
    }
  }
  @media screen and (max-width: 280px) {
    padding: 0rem 1rem;
  }
`;

const Button = styled(motion.button)`
  margin-top: 2rem;
  padding: 1rem 3rem;
  font-size: 1rem;
  border: 2px solid white;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  background: transparent;
  color: white;
  background: black;
`;

const Image = styled(motion.img)`
  position: absolute;
  width: 100%;
  height: 100%;
  max-width: 360px;
  max-height: 360px;
  @media screen and (max-width: 768px) {
    min-width: 300px;
    min-height: 300px;
  }
  @media screen and (max-width: 576px) {
    min-width: 150px;
    min-height: 150px;
  }
`;

const ColumnRight = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  position: relative;
  ${Image}:nth-child(1) {
    top: 25%;
    left: 20%;
  }
  @media screen and (max-width: 992px) {
    grid-column: 1;
    grid-row: 1;
    ${Image}:nth-child(1) {
      top: 20%;
      left: 20%;
    }
  }
  @media screen and (max-width: 768px) {
  }
  @media screen and (max-width: 576px) {
    ${Image}:nth-child(1) {
      top: 20%;
      left: 0%;
    }
  }
  @media screen and (max-width: 280px) {
    padding: 1rem;
  }
`;

const Home = () => {
  const fadeLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <Section>
      <Container>
        <ColumnLeft>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Welcome to ChatWolf
          </motion.h1>
          <motion.p
            variants={fadeLeft}
            initial="hidden"
            animate="visible"
            transition={{ duration: 1 }}
          >
            Designed For You!
          </motion.p>

          <Link to="/login">
            <Button
              whileHover={{ scale: 1.03 }}
              whileTap={{
                scale: 0.98,
                backgroundColor: 'white',
                border: 'black',
                color: 'black',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 1.5 } }}
            >
              Get Started
            </Button>
          </Link>
        </ColumnLeft>
        <ColumnRight>
          <Image
            src={logo}
            alt="logo"
            whileTap={{ scale: 0.9 }}
            drag={true}
            dragConstraints={{ left: 0, right: 80, top: 0, bottom: 20 }}
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
          />
        </ColumnRight>
      </Container>
    </Section>
  );
};

export default Home;

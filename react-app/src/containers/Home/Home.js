import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Home.module.css';

import logo from '../../assets/main-logo.png';

export const Home = props => (
  <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <Link className="App-link" to="/feed">
      Enter.
    </Link>
    <p className={styles.disclaimer}>
      This website contains content that is only for users over 18 years of age.
    </p>
  </header>
);

export default Home;

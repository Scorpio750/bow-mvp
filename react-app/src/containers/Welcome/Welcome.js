import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Welcome.module.css';

import logo from '../../assets/main-logo.png';

export const Welcome = props => (
  <header className={styles.welcomeSplash}>
    <img src={logo} className="App-logo" alt="logo" />
    <Link className={styles.welcomelink} to="/feed">
      Enter.
    </Link>
    <p className={styles.disclaimer}>
      This website contains content of a sensitive nature, by entering you agree that you are at least 18 years of age or over.
    </p>
  </header>
);

export default Welcome;

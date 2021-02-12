import React from 'react';

import styles from './Footer.module.css';

export const Footer = props => (
  <footer className={styles.footer} >
    <ul className={styles.ul} >
      <li className={styles.li}>ABOUT</li>
      <li className={styles.li}>FAQ</li>
      <li className={styles.li}>CONTACT</li>
      <li className={styles.li}>TERMS ABOUT CONDITIONS</li>
      <li className={styles.li}>PRIVACY</li>
      <li className={styles.li}>DONATIONS</li>
      <li className={styles.li}>MAILING LIST</li>
    </ul>
  </footer>
);

export default Footer;

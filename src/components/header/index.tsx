import React from 'react';

import logo from './logo.svg';
import styles from './style.css';

const Header = () => (
  <header className={styles.header}>
    <img alt="logo" className={styles.logo} src={logo} />
    <h1 className={styles.title}>Welcome to React</h1>
  </header>
);

export default Header;

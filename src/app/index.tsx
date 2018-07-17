import React from 'react';

import Header from '../components/header';
import Home from '../pages/home';
import { run } from '../services/discord';
import styles from './style.css';

const App = () => {
  run();
  return (
    <div className={styles.app}>
      <Header />
      <Home />
    </div>
  );
};

export default App;

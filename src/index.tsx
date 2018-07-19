import React from 'react';
import ReactDOM from 'react-dom';

import App from './app/';
import './index.css';

const element = document.getElementById('root');

if (element) {
  ReactDOM.render(<App />, element);
}

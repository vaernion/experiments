// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App_oppg1og2';

const root = document.getElementById('root');

if (root) {
  ReactDOM.render(
    <div>
      <App />
    </div>,
    root
  );
}

// setTimeout(() => {
//   ReactDOM.unmountComponentAtNode(root);
// }, 2000);

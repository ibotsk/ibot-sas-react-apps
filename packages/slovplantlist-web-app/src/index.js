import React from 'react';
import ReactDOM from 'react-dom';
import './i18n';
import 'fontsource-roboto';

import { HelmetProvider } from '@ibot/components';

import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

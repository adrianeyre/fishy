import React from 'react';
import ReactDOM from 'react-dom';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import Fishy from './components/fishy/fishy';

import './index.css';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <React.StrictMode>
        <Fishy />
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();

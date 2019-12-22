import React from 'react';
import ReactDOM from 'react-dom';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import Fishy from './components/fishy/fishy';

import './index.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Fishy />, document.getElementById('root'));
serviceWorker.unregister();

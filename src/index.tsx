import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import Fishy from './components/fishy/fishy';

import './index.css';
import reportWebVitals from './reportWebVitals';

// React 19 removed `ReactDOM.render`. `react-app-polyfill` went with
// react-scripts, and is no longer needed: the build targets es2022, which is
// past every browser those polyfills existed for.
const container = document.getElementById('root');
if (!container) throw new Error('No #root element to mount Fishy into');

createRoot(container).render(
  <StrictMode>
    <Fishy />
  </StrictMode>,
);

reportWebVitals();

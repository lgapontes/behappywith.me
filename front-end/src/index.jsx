import React from 'react'
import ReactDOM from 'react-dom'

import './img/favicon.ico';

import './css/index.css';
import './css/pure-min.css';

// Application Cache
import './behappy.appcache'

// Cache Storage e Service Worker
//import './behappy.sw.js';

import App from './components/App.jsx'

ReactDOM.render(
    <App />,
    document.querySelector("#main")
)
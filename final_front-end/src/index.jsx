import React from 'react'
import ReactDOM from 'react-dom'

import './img/favicon.ico';
import './css/index.css';
import './css/pure-min.css';

import BemVindo from './components/exemplo/BemVindo.jsx';

ReactDOM.render(
    <BemVindo />,
    document.querySelector("#main")
)
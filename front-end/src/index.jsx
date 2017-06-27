import React from 'react'
import ReactDOM from 'react-dom'

import Ex1 from './components/exemplo/Ex1.jsx';
import Ex2 from './components/exemplo/Ex2.jsx';
//import Buttons from './components/exemplo/Buttons.jsx';

import './index.css';
import './pure-min.css';
import './fonts/material-icons.css';

ReactDOM.render(
    <div>
        <button className="pure-button pure-button-primary">A Primary Button</button>
        <br />
        <Ex1 />
        <br />
        <Ex2 />
    </div>,
    document.querySelector("#main")
)
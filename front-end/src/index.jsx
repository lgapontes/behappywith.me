import React from 'react'
import ReactDOM from 'react-dom'

import './img/favicon.ico';

import './css/index.css';
import './css/pure-min.css';

/*
import App from './components/App.jsx'

ReactDOM.render(
    <App />,
    document.querySelector("#main")
)
*/



import {
    BrowserRouter,
    Link,
    Route
} from 'react-router-dom'

const Principal = () => {
    return <h1>Página principal</h1>
}
const Dados = () => {
    return <h1>Dados de dados</h1>
}

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Route exact path="/" component={Principal} />            
            <Route path="/dados" component={Dados} />
            <br /><br />
            <Link to="/">Principal</Link> - <Link to="/dados">Dados</Link>
        </div>
    </BrowserRouter>,
    document.querySelector("#main")
)
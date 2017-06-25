import React from 'react'
import ReactDOM from 'react-dom'

class OlaReact extends React.Component {
    render() {
        return <h1>Olá React!!!</h1>
    }
}

ReactDOM.render(
    <OlaReact />,
    document.querySelector("#exemplo")
)
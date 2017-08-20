// Classe de componente com JSX
class OlaReact extends React.Component {
    render() {
        return <h1>Olá React!!!</h1>
    }
}
ReactDOM.render(
    <OlaReact />,
    document.querySelector("#exemplo")
);

// API nativa do React
var OlaReact = React.createElement(
    'h1',
    null,
    'Olá React!!!'
);
ReactDOM.render(
    OlaReact,
    document.querySelector("#exemplo")
);
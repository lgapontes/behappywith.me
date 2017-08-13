// Este código não funciona

class TesteStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            atributoUm: 'a',
            atributoDois: 'b'
        };
    }
    
    atualizar(e) {
        this.setState({
            atributoUm: 'c'
        });
    }
    
    // render() ...
}
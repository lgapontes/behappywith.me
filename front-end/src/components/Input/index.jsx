import React from 'react'

class Input extends React.Component {
    constructor(props) {
        super(props);        
        this.state = {
            value: props.value
        }
    }

    atualizar(e) {
        this.setState({
            value: e.target.value
        });
    }

    render() {        
        const estilo = {
            borderColor: this.props.valorInvalido ? '#d50000' : '#cccccc',
            backgroundColor: this.props.valorInvalido ? '#ffcdd2' : '#ffffff'
        };

        let propriedades = Object.assign({},this.props);
        delete propriedades.valorInvalido;
        delete propriedades.value;

        return (
            <input
                type="text"
                style={estilo}
                value={this.state.value}
                onChange={this.atualizar.bind(this)}
                {...propriedades}
            />
        )
    }
}

export default Input;
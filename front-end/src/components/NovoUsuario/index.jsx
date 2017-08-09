import React from 'react'
import Label from '../Label'
import Input from '../Input'

class NovoUsuario extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usuario: {
                nome: ''
            },
            validacao: {
                nomeInvalido: false
            }            
        };
    }

    atualizarNome(e) {
        this.setState({
            usuario: {
                nome: e.target.value
            }
        });
    }

    render() {
        return (            
            <div className="center">
                <form className="pure-form pure-form-stacked">
                    <Label
                        htmlFor="nome"
                        texto="Quem é você?"
                        valorInvalido={this.state.validacao.nomeInvalido}
                    />
                    <Input
                        id="nome"
                        placeholder="Digite seu nome"
                        maxLength="40"
                        readOnly={false}
                        valorInvalido={this.state.validacao.nomeInvalido}
                        defaultValue={this.state.usuario.nome}
                        onChange={this.atualizarNome.bind(this)}
                    />
                </form>
            </div>
        );
    }
}

export default NovoUsuario;
import React from 'react'
import Label from '../Label'
import Input from '../Input'
import GenderSelector from '../GenderSelector'
import Usuario from '../../models/Usuario'
import Button from '../Button'

class NovoUsuario extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            usuario: new Usuario(),
            validacao: {
                nomeInvalido: false,
                generoInvalido: false
            }
        };
    }

    atualizarNome(e) {
        let usuario = this.state.usuario;
        usuario.nome = e.target.value;        
        this.setState({
            usuario: usuario
        });
    }
    atualizarGenero(e,genero) {
        e.preventDefault();
        let usuario = this.state.usuario;
        usuario.genero = genero;
        this.setState({
            usuario: usuario
        });
    }
    primeiraValidacao(e) {
        e.preventDefault();
        console.log('O botão Próximo foi clicado...');
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
                    <Label
                        texto="Seu gênero:"
                        valorInvalido={this.state.validacao.generoInvalido}
                    />
                    <GenderSelector
                        valorInvalido={this.state.validacao.generoInvalido}
                        genero={this.state.usuario.genero}
                        atualizarGenero={this.atualizarGenero.bind(this)}
                    />                    
                    <Button
                        principal
                        texto="Próximo"
                        onClick={this.primeiraValidacao.bind(this)}
                    />
                </form>
            </div>
        );
    }
}

export default NovoUsuario;
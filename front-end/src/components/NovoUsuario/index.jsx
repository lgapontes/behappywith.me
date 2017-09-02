import React from 'react'
import Label from '../Label'
import Input from '../Input'
import GenderSelector from '../GenderSelector'
import Usuario from '../../models/Usuario'
import Listas from '../../models/Listas'
import Button from '../Button'
import Toast from '../Toast'
import ImageSelector from '../ImageSelector'

class NovoUsuario extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            usuario: new Usuario(),
            validacao: {
                nomeInvalido: false,
                generoInvalido: false
            },
            primeiraVisaoCompleta: false
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
        let usuario = this.state.usuario;
        let validacao = this.state.validacao;        
        validacao.nomeInvalido = ! usuario.validarNome();
        validacao.generoInvalido = ! usuario.validarGenero();        

        let mensagem = '';    
        let primeiraVisaoCompleta = false;
        if (validacao.nomeInvalido && validacao.generoInvalido) {
            mensagem = 'Os campos nome e gênero estão inválidos!'
        } else if (validacao.nomeInvalido) {
            mensagem = 'Seu nome está inválido!'
        } else if (validacao.generoInvalido) {
            mensagem = 'Selecione seu gênero!'
        } else {
            primeiraVisaoCompleta = true;
        }
        if (!primeiraVisaoCompleta) {
            this.refs.toast.exibir(mensagem);
        }

        this.setState({
            validacao: validacao,
            primeiraVisaoCompleta: primeiraVisaoCompleta
        });
    }
    voltar(e) {
        e.preventDefault();
        this.setState({            
            primeiraVisaoCompleta: false
        });
    }

    renderizarNome() {
        return (
            <section>
                <Label
                    htmlFor="nome"
                    texto="Quem é você?"
                    valorInvalido={this.state.validacao.nomeInvalido}
                />                    
                <Input
                    id="nome"
                    placeholder="Digite seu nome"
                    maxLength="40"
                    readOnly={this.state.primeiraVisaoCompleta}
                    valorInvalido={this.state.validacao.nomeInvalido}
                    defaultValue={this.state.usuario.nome}
                    onChange={this.atualizarNome.bind(this)}
                />
            </section>
        )
    }

    renderizarGenero() {
        if (this.state.primeiraVisaoCompleta) {
            return null
        } else {
            return (
                <section>
                    <Label
                        texto="Seu gênero:"
                        valorInvalido={this.state.validacao.generoInvalido}
                    />
                    <GenderSelector
                        valorInvalido={this.state.validacao.generoInvalido}
                        genero={this.state.usuario.genero}
                        atualizarGenero={this.atualizarGenero.bind(this)}
                    />
                </section>
            )
        }
    }

    renderizarAvatar() {
        if (this.state.primeiraVisaoCompleta) {    
            return (
                <section>
                    <Label
                        texto="Escolha seu avatar:"
                        valorInvalido={this.state.validacao.avatarInvalido}
                    />
                    <ImageSelector                    
                        arquivo="img/avatars.png"
                        eixoY={(this.state.usuario.genero == 'm' ? 0 : 1)}
                        elementos={Listas.avatares}
                        selecionado={this.state.usuario.avatar}
                        onChange={avatar => {                            
                            let usuario = this.state.usuario;
                            usuario.avatar = avatar;                            
                            this.setState({                                
                                usuario: usuario                                
                            });
                        }}
                    />
                </section>
            )
        } else {
            return null            
        }
    }

    renderizarBotoes() {
        if (this.state.primeiraVisaoCompleta) {
            return (
                <section>
                    <Button
                        texto="Voltar"
                        onClick={this.voltar.bind(this)}
                    />
                    <Button
                        principal
                        texto="Salvar"
                        onClick={e => {
                            e.preventDefault()
                            console.log(this.state.usuario)
                        }}
                    />
                </section>
            )
        } else {
            return (
                <section>
                    <Button
                        principal
                        texto="Próximo"
                        onClick={this.primeiraValidacao.bind(this)}
                    />
                </section>
            )
        }
    }

    render() {
        return (
            <div className="center">
                <form className="pure-form pure-form-stacked">
                    {this.renderizarNome()}
                    {this.renderizarGenero()}
                    {this.renderizarAvatar()}
                    {this.renderizarBotoes()}
                    <Toast erro ref="toast" />
                </form>
            </div>
        );
    }
}

export default NovoUsuario;
import React from 'react';
import Header from './Header';
import NovoUsuario from './NovoUsuario';
import NovaGentileza from './NovaGentileza';
import Toast from './Toast';
import Usuario from '../models/Usuario'

class App extends React.Component {
    constructor() {
        super()
        Usuario.obter(usuario => {            
            this.state = {
                usuario: usuario
            };            
        },() => {
            this.state = {
                usuario: undefined
            };            
        });
    }
    msgNovoUsuario(usuario) {
        let genero = usuario.genero == 'm' ? 'o' : 'a';
        this.refs.toast.sucesso(
            `Seja bem-vind${genero} ${usuario.nome}!`
        )
    }
    msgNovaGentileza() {
        this.refs.toast.sucesso(
            'Nova gentileza cadastrada!'
        )
    }
    renderizarNovoUsuario() {
        let usuario = this.state.usuario;        
        if (usuario) {
            return (
                <div style={{marginTop: '140px', textAlign: 'center'}}>
                    <b>Usuário obtido do <i>localStorage</i></b><br />
                    {usuario.toString()}
                </div>
            )
        } else {
            return (
                <NovoUsuario
                    onSubmit={usuario => {                        
                        usuario.salvar(() => {
                            this.setState({
                                usuario: usuario
                            }, () => {
                                this.msgNovoUsuario(usuario)
                            })                            
                        });
                    }}
                    erro={msg=>this.refs.toast.erro(msg)}
                />
            )
        }      
    }
    renderizarNovaGentileza() {
        return (
            <NovaGentileza
                onSubmit={gentileza => {                    
                    console.log(gentileza);                        
                    this.msgNovaGentileza();
                }}
            />
        )   
    }

    render() {
        return (
            <div>
                <Header />
                {this.renderizarNovaGentileza()}
                <Toast ref="toast" />
            </div>
        );
    }
}

export default App;
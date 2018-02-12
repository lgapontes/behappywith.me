import React from 'react';
import Header from './Header';
import NovoUsuario from './NovoUsuario';
import NovaGentileza from './NovaGentileza';
import ListarGentilezas from './ListarGentilezas';
import PerfilUsuario from './PerfilUsuario';
import FixedButton from './FixedButton';
import Toast from './Toast';
import Usuario from '../models/Usuario';
import {
    BrowserRouter,
    Route,
    Switch
} from 'react-router-dom';

function RenderizarListarGentilezas(props) {
    return (
        <section>
            <ListarGentilezas
                key={props.id}
                gentilezas={props.usuario.gentilezas}
                excluirGentileza={props.excluirGentileza}
                executarGentileza={props.executarGentileza}
                showTimeStamp={props.showTimeStamp}
            />
            <FixedButton
                index="3"
                type="primary"
                url="/gentileza"
            />
            <FixedButton
                index="7"
                type="secondary"
                onClick={props.recarregar}
            />
        </section>
    )
}
function RenderizarNovaGentileza(props) {
    return (
        <NovaGentileza
            {...props}
        />
    )   
}

class App extends React.Component {
    constructor(props) {
        super(props)
        Usuario.obter(usuario => {            
            this.state = {
                usuario: usuario,
                showTimeStamp: 0
            };            
        },() => {
            this.state = {
                usuario: undefined,
                showTimeStamp: false
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
    msgGentilezaExcluida() {
        this.refs.toast.sucesso(
            'Gentileza excluída!'
        )
    }
    msgGentilezaExecutada() {
        this.refs.toast.sucesso(
            'Gentileza realizada com sucesso!'
        )
    }
    renderizarNovoUsuario() {
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
    renderizar() {
        let usuario = this.state.usuario;
        if (this.state.usuario) {
            return (
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" render={() => ( 
                            <RenderizarListarGentilezas
                                id={Date.now()}
                                usuario={usuario}
                                excluirGentileza={uid => {
                                    let usuario = this.state.usuario;
                                    usuario.excluirGentileza(uid,() => {
                                        this.setState({
                                            usuario: usuario
                                        }, () => {
                                            this.msgGentilezaExcluida();
                                        })
                                    })
                                }}
                                executarGentileza={uid => {
                                    let usuario = this.state.usuario;
                                    usuario.executarGentileza(uid,() => {
                                        this.setState({
                                            usuario: usuario
                                        }, () => {
                                            this.msgGentilezaExecutada();
                                        })
                                    })
                                }}
                                recarregar={() => {
                                    Usuario.obter(usuario => {            
                                        this.setState({
                                            usuario: usuario,
                                            showTimeStamp: true
                                        });
                                    },() => {
                                        this.setState({
                                            usuario: undefined,
                                            showTimeStamp: true
                                        });
                                    });
                                }}
                                showTimeStamp={this.state.showTimeStamp}
                            />
                        )}/>
                        <Route path="/gentileza" render={() => (
                            <RenderizarNovaGentileza
                                onSubmit={(gentileza,callback) => {                                    
                                    let usuario = this.state.usuario;                                    
                                    usuario.adicionarGentileza(gentileza,() => {
                                        this.setState({
                                            usuario: usuario
                                        }, () => {
                                            this.msgNovaGentileza();                             
                                            callback();
                                        })
                                    });
                                }}
                            />
                        )}/>
                        <Route path="/perfil" render={() => (
                            <PerfilUsuario
                                usuario={this.state.usuario}
                            />
                        )}/>
                    </Switch>
                </BrowserRouter>
            )
        } else {
            return this.renderizarNovoUsuario()
        }      
    }    

    render() {
        return (            
            <div>
                <Header />
                {this.renderizar()}
                <Toast ref="toast" />
            </div>
        );
    }
}

export default App;
import React from 'react';
import Header from './Header';
import NovoUsuario from './NovoUsuario';
import NovaGentileza from './NovaGentileza';
import ListarGentilezas from './ListarGentilezas';
import PerfilUsuario from './PerfilUsuario';
import FixedButton from './FixedButton';
import ButtonImage from './ButtonImage'
import Toast from './Toast';
import Usuario from '../models/Usuario';
import TimeStamp from '../models/TimeStamp';
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
                timestamp={props.timestamp}
                showTopScreen={props.showTopScreen}
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
            <ButtonImage                    
                tipo="header-menu"
                url="/perfil"
            />
        </section>
    )
}
function RenderizarNovaGentileza(props) {    
    return (
        <NovaGentileza
            key={props.id}
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
                showTimeStamp: false,
                timestamp: undefined,
                showTopScreen: false,
                uidGentileza: undefined
            };            
        },() => {
            this.state = {
                usuario: undefined,
                showTimeStamp: false,
                timestamp: undefined,
                showTopScreen: false,
                uidGentileza: undefined
            };            
        });
    }
    msgNovoUsuario(usuario) {
        let genero = usuario.genero == 'm' ? 'o' : 'a';
        this.refs.toast.sucesso(
            `Seja bem-vind${genero} ${usuario.nome}!`
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
                                            usuario: usuario,
                                            showTimeStamp: true,
                                            timestamp: (new TimeStamp()).toString(),
                                            showTopScreen: false
                                        })
                                    })
                                }}
                                executarGentileza={uid => {
                                    let usuario = this.state.usuario;
                                    usuario.executarGentileza(uid,() => {
                                        this.setState({
                                            usuario: usuario,
                                            showTimeStamp: true,
                                            timestamp: (new TimeStamp()).toString(),
                                            showTopScreen: false
                                        })
                                    })
                                }}
                                recarregar={() => {
                                    Usuario.obter(usuario => {            
                                        this.setState({
                                            usuario: usuario,
                                            showTimeStamp: true,
                                            timestamp: (new TimeStamp()).toString(),
                                            showTopScreen: false                                          
                                        });
                                    },() => {
                                        this.setState({
                                            usuario: undefined,
                                            showTimeStamp: true,
                                            timestamp: (new TimeStamp()).toString(),
                                            showTopScreen: false
                                        });
                                    });
                                }}
                                showTimeStamp={this.state.showTimeStamp}
                                showTopScreen={this.state.showTopScreen}
                                timestamp={this.state.timestamp}
                            />
                        )}/>
                        <Route path="/gentileza" render={() => (
                            <RenderizarNovaGentileza
                                id={Date.now()}
                                onSubmit={(gentileza,callback) => {                                    
                                    let usuario = this.state.usuario;                                    
                                    usuario.adicionarGentileza(gentileza,() => {
                                        this.setState({
                                            usuario: usuario,
                                            showTimeStamp: true,
                                            timestamp: (new TimeStamp()).toString(),
                                            showTopScreen: true
                                        }, () => {                             
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
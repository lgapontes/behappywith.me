import React from 'react';
import Header from './Header';
import NovoUsuario from './NovoUsuario';
import NovaGentileza from './NovaGentileza';
import ListarGentilezas from './ListarGentilezas';
import NewButton from './NewButton';
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
                gentilezas={props.usuario.gentilezas}
                excluirGentileza={props.excluirGentileza}
                executarGentileza={props.executarGentileza}
            />
            <NewButton />
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
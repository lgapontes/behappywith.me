import React from 'react';
import Header from './Header';
import NovoUsuario from './NovoUsuario';
import NovaGentileza from './NovaGentileza';
import Toast from './Toast';
import Usuario from '../models/Usuario';
import {
    BrowserRouter,
    Route,
    Switch
} from 'react-router-dom';

function teste() {
    return (
        <div>teste</div>
    )
}

function RenderizarListaGentilezas(props) {
    return (
        <div style={{marginTop: '140px', textAlign: 'center'}}>
            <b>Usuário obtido do <i>localStorage</i></b><br />
            {props.usuario.toString()}
        </div>
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
                            <RenderizarListaGentilezas usuario={usuario} />
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
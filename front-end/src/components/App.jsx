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
import Gentileza from '../models/Gentileza';
import TimeStamp from '../models/TimeStamp';
import {
    BrowserRouter,
    Route,
    Switch
} from 'react-router-dom';

const EXIBICAO = 10;

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
                uidGentileza={props.uidGentileza}
                totalExibicao={props.totalExibicao}
                incrementarTotalExibicao={props.incrementarTotalExibicao}
                disableFadeout={props.disableFadeout}
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
                uidGentileza: undefined,
                totalExibicao: EXIBICAO,
                disableFadeout: false
            };            
        },() => {
            this.state = {
                usuario: undefined,
                showTimeStamp: false,
                timestamp: undefined,
                showTopScreen: false,
                uidGentileza: undefined,
                totalExibicao: EXIBICAO,
                disableFadeout: false
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
                    let gentileza = Gentileza.criarGentilezaAleatoria();
                    usuario.salvarComInclusaoDeGentileza(gentileza,() => {
                        this.setState({
                            usuario: usuario
                        }, () => {
                            this.msgNovoUsuario(usuario);
                            this.refs.toast.info(
                                'Você ganhou seu primeiro agendamento. ' +
                                'Tente realizá-lo no prazo para ganhar mais experiência.'
                            );
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
                <Switch>
                    <Route exact path="/" render={() => ( 
                        <RenderizarListarGentilezas
                            id={Date.now()}
                            usuario={usuario}
                            excluirGentileza={uid => {
                                let usuario = this.state.usuario;
                                let totalExibicao = this.state.totalExibicao;
                                usuario.excluirGentileza(uid,() => {
                                    this.setState({
                                        usuario: usuario,
                                        showTimeStamp: true,
                                        timestamp: (new TimeStamp()).toString(),
                                        showTopScreen: false,
                                        uidGentileza: undefined,
                                        totalExibicao: totalExibicao,
                                        disableFadeout: false
                                    })
                                })
                            }}
                            executarGentileza={uid => {
                                let usuario = this.state.usuario;
                                let totalExibicao = this.state.totalExibicao;
                                usuario.executarGentileza(uid,() => {
                                    this.setState({
                                        usuario: usuario,
                                        showTimeStamp: true,
                                        timestamp: (new TimeStamp()).toString(),
                                        showTopScreen: false,
                                        uidGentileza: uid,
                                        totalExibicao: totalExibicao,
                                        disableFadeout: false
                                    })
                                })
                            }}
                            recarregar={() => {
                                let totalExibicao = this.state.totalExibicao;
                                Usuario.obter(usuario => {            
                                    this.setState({
                                        usuario: usuario,
                                        showTimeStamp: true,
                                        timestamp: (new TimeStamp()).toString(),
                                        showTopScreen: false,
                                        uidGentileza: undefined,
                                        totalExibicao: totalExibicao,
                                        disableFadeout: false                            
                                    });
                                },() => {
                                    this.setState({
                                        usuario: undefined,
                                        showTimeStamp: true,
                                        timestamp: (new TimeStamp()).toString(),
                                        showTopScreen: false,
                                        uidGentileza: undefined,
                                        totalExibicao: totalExibicao,
                                        disableFadeout: false
                                    });
                                });
                            }}
                            showTimeStamp={this.state.showTimeStamp}
                            showTopScreen={this.state.showTopScreen}
                            timestamp={this.state.timestamp}
                            uidGentileza={this.state.uidGentileza}
                            totalExibicao={this.state.totalExibicao}
                            incrementarTotalExibicao={() => {
                                let usuario = this.state.usuario;
                                let totalExibicao = this.state.totalExibicao;
                                totalExibicao = totalExibicao + EXIBICAO;
                                this.setState({
                                    totalExibicao: totalExibicao
                                })
                            }}
                            disableFadeout={this.state.disableFadeout}
                        />
                    )}/>
                    <Route path="/gentileza" render={() => (
                        <RenderizarNovaGentileza
                            id={Date.now()}
                            onSubmit={(gentileza,callback) => {                                    
                                let usuario = this.state.usuario;
                                let totalExibicao = this.state.totalExibicao;                                    
                                usuario.adicionarGentileza(gentileza,() => {
                                    this.setState({
                                        usuario: usuario,
                                        showTimeStamp: true,
                                        timestamp: (new TimeStamp()).toString(),
                                        showTopScreen: true,
                                        uidGentileza: gentileza.uid,
                                        totalExibicao: totalExibicao,
                                        disableFadeout: false
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
                            onDisableFadeout={callback => {
                                this.setState({
                                    disableFadeout: true
                                }, () => {                             
                                    callback();
                                })
                            }}
                        />
                    )}/>
                </Switch>
            )
        } else {
            return this.renderizarNovoUsuario()
        }      
    }    

    gerarNovaGentileza() {
        let gentileza = Gentileza.criarGentilezaAleatoria();
        let usuario = this.state.usuario;
        let totalExibicao = this.state.totalExibicao;                                    
        usuario.adicionarGentileza(gentileza,() => {
            this.setState({
                usuario: usuario,
                showTimeStamp: true,
                timestamp: (new TimeStamp()).toString(),
                showTopScreen: true,
                uidGentileza: gentileza.uid,
                totalExibicao: totalExibicao,
                disableFadeout: false
            }, () => {                             
                this.refs.toast.info(
                    'Você ganhou um novo agendamento de gentileza! '
                )
            })
        });
    }

    componentDidMount() {
        if (this.state.usuario) {
            let length = this.state.usuario.gentilezas.length;
            if (length > 0) {
                let gentilezaMaisRecente = this.state.usuario.gentilezas[0];
                if (gentilezaMaisRecente.temMaisDeUmDia()) {
                    this.gerarNovaGentileza();                
                }
            }
        }
    }

    render() {
        return (
            <BrowserRouter>                        
                <div>
                    <Header />
                    {this.renderizar()}
                    <Toast ref="toast" />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
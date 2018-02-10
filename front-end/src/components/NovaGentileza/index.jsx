import React from 'react'
import Label from '../Label'
import Gentileza from '../../models/Gentileza'
import Destinatario from '../../models/Destinatario'
import TimeStamp from '../../models/TimeStamp'
import Button from '../Button'
import ImageScroller from '../ImageScroller'
import { withRouter } from 'react-router-dom'

const BotaoCancelar = withRouter(({ history }) => (
    <Button
        texto="Cancelar"
        onClick={e => {
            e.preventDefault();
            history.push('/')
        }}
    />
));
const BotaoSalvar = withRouter((props) => (
    <Button
        principal
        texto="Salvar"
        onClick={e => {
            e.preventDefault();
            let gentileza = props.state.gentileza;
            gentileza.timestamp = new TimeStamp();
            props.onSubmit(gentileza,() => {
                props.history.push('/')
            });
        }}
    />
));

class NovaGentileza extends React.Component {
    constructor(props) {
        super(props);
        let gentileza = Gentileza.obterTodos()[0];
        gentileza.destinatario = Gentileza.obterTodos()[0].obterDestinatarios()[0];

        this.state = {
            gentileza: gentileza
        };
    }

    renderizarGentileza() {
        return (
            <section>
                <Label
                    texto="Qual gentileza?"
                />
                <ImageScroller
                    arquivo="img/gentilezas.png"
                    eixoY={0}
                    elementos={Gentileza.obterTodos()}
                    selecionado={this.state.gentileza}
                    onChange={gentileza => {
                        gentileza.destinatario = gentileza.obterDestinatarios()[0];
                        this.setState({                                
                            gentileza: gentileza
                        });
                    }}
                />
            </section>
        )
    }
    renderizarDestinatario() {
        return (
            <section>
                <Label
                    texto="Para quem?"
                />
                <ImageScroller
                    key={`destinatarios-${this.state.gentileza.toString()}`}
                    arquivo="img/gentilezas.png"
                    eixoY={1}
                    elementos={this.state.gentileza.obterDestinatarios()}
                    selecionado={this.state.gentileza.destinatario}
                    onChange={destinatario => {
                        let gentileza = this.state.gentileza;
                        gentileza.destinatario = destinatario;
                        this.setState({                                
                            gentileza: gentileza                        
                        });
                    }}
                />
            </section>
        )
    }
    renderizarBotoes() {
        return (
            <section>
                <BotaoCancelar />
                <BotaoSalvar
                    state={this.state}
                    onSubmit={this.props.onSubmit}
                />
            </section>
        )
    }

    render() {
        return (
            <div className="center">
                <form className="pure-form pure-form-stacked">                    
                    {this.renderizarGentileza()}
                    {this.renderizarDestinatario()}
                    {this.renderizarBotoes()}                    
                </form>
            </div>
        );
    }
}

export default NovaGentileza;
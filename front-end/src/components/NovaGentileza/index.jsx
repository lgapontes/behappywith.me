import React from 'react'
import Label from '../Label'
import Gentileza from '../../models/Gentileza'
import Destinatario from '../../models/Destinatario'
import Button from '../Button'
import ImageScroller from '../ImageScroller'

class NovaGentileza extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            gentileza: Gentileza.obterTodos()[0],
            destinatario: Gentileza.obterTodos()[0].obterDestinatarios()[0]
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
                    arquivo="img/gentilezas.png"
                    eixoY={1}
                    elementos={this.state.gentileza.obterDestinatarios()}
                    selecionado={this.state.destinatario}
                    onChange={destinatario => {
                        this.setState({                                
                            destinatario: destinatario                                
                        });
                    }}
                />
            </section>
        )
    }

    renderizarBotoes() {
        return (
            <section>
                <Button
                    texto="Cancelar"
                    onClick={e => {
                        e.preventDefault();                            
                    }}
                />
                <Button
                    principal
                    texto="Salvar"
                    onClick={e => {
                        e.preventDefault()                            
                    }}
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
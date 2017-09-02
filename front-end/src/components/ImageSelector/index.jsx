import React from 'react'
import Image from '../Image'
import ButtonImage from '../ButtonImage'
import ManipularEvento from './ManipularEvento'

class ImageSelector extends React.Component {
    constructor(props) {
        super(props)
        this.onClick = false;        

        let comprimento = 170;
        let maxLeft = 105;
        let minLeft = (
            (this.props.elementos.length - 1) *
            comprimento * (-1)
        ) + maxLeft;

        this.state = {
            manipularEvento: new ManipularEvento(
                minLeft,
                maxLeft,
                comprimento,
                this.props.selecionado,
                0,
                this.props.elementos.length
            )
        }
    }

    renderizarButtonImage(posicao) {
        return (
            <ButtonImage
                tipo='image-scroller'                
                posicao={posicao}
                onTouchStart={e => {
                    this.onClick = true;
                }}
                onClick={e => {
                    e.preventDefault();
                    let manipularEvento = this.state.manipularEvento;
                    let index = manipularEvento.index;
                    if (posicao == 'esquerda') {
                        index += -1;
                    } else {
                        index += 1;
                    }
                    manipularEvento.definirIndex(index);
                    manipularEvento.atualizar();
                    
                    this.setState({ manipularEvento: manipularEvento },() => {
                        this.props.onChange(
                            this.props.elementos[
                                this.state.manipularEvento.index
                            ].item
                        );
                    });

                    this.onClick = false;
                }}
            />
        )
    }

    renderizarSelecionado() {
        return (
            <span
                style={{
                    float: 'left',
                    width: '170px',
                    height: '193px',
                    marginLeft: '61px',
                    backgroundColor: '#00C853',
                    position: 'relative',
                    zIndex: -2
                }}
            ></span>
        )
    }

    renderizarImagem(index) {
        let eixoY = this.props.eixoY ? this.props.eixoY : 0;
        return (            
            <li style={{
                paddingTop: '10px',
                position: 'absolute',
                zIndex: '-1',
                marginLeft: `${index * 170}px`
            }} key={index}>
                <Image                    
                    eixoX={index}
                    eixoY={eixoY}
                    width={170}
                    height={170}
                    backgroundHeight={340}
                    arquivo={this.props.arquivo}
                />
            </li>
        )   
    }

    renderizarImagens() {
        const ms = this.state.manipularEvento.toqueEmExecucao
            ? '100ms' : '800ms'

        const ul = {
            WebkitTransitionDuration: ms, /* Safari */
            transitionDuration: ms,

            listStyleType: 'none',
            margin: '0',
            padding: '0',
            position: 'relative',
            width: '3910px',
            left: `${this.state.manipularEvento.left}px`
        }

        const lista = this.props.elementos.map(
            (entry,index) => this.renderizarImagem(index)
        );

        return (
            <ul style={ul}>                
                {lista}
            </ul>            
        )
    }

    onTouchStart(e) {                
        if (this.onClick) {
            e.stopPropagation()
            return;
        }
        let clientX = e.targetTouches[0].clientX;
        let manipularEvento = this.state.manipularEvento;
        manipularEvento.iniciar(clientX);
        this.setState({ manipularEvento: manipularEvento });
    }
    onTouchMove(e) {
        if (this.onClick) {
            e.stopPropagation()
            return;
        }        
        let clientX = e.targetTouches[0].clientX;
        let manipularEvento = this.state.manipularEvento;
        manipularEvento.mover(clientX);
        this.setState({ manipularEvento: manipularEvento });   
    }
    onTouchEnd() {         
        if (this.onClick) {            
            return;
        }
        let manipularEvento = this.state.manipularEvento;
        manipularEvento.atualizar();
        this.setState({ manipularEvento: manipularEvento },() => {
            this.props.onChange(
                this.props.elementos[
                    this.state.manipularEvento.index
                ].item
            );
        });
    }

    render() {
        const estiloDiv = {
            boxSizing: 'border-box',
            border: '1px solid #cccccc',
            borderRadius: '5px',        
            width: '380px',
            height: '195px',
            overflow: 'hidden'
        };
                
        return (
            <div
                style={estiloDiv}
                onTouchStart={this.onTouchStart.bind(this)}
                onTouchMove={this.onTouchMove.bind(this)}
                onTouchEnd={this.onTouchEnd.bind(this)}
            >                
                {this.renderizarButtonImage('esquerda')}
                {this.renderizarSelecionado()}
                {this.renderizarImagens()}
                {this.renderizarButtonImage('direita')}
            </div>
        )
    }
}

export default ImageSelector;
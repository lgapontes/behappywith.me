import React from 'react'
import Image from '../Image'
import ButtonImage from '../ButtonImage'
import ManipularEvento from './ManipularEvento'

class ImageSelector extends React.Component {
    constructor(props) {
        super(props)
        this.onClick = false;        

        this.state = {
            manipularEvento: new ManipularEvento(
                -3465,
                105,                
                170,
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
                onMouseDown={e => {                    
                    this.onClick = true;
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
                    this.setState({ manipularEvento: manipularEvento });
                }}
                onMouseUp={e => {                    
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
        return (
            <li style={{
                paddingTop: '10px',
                position: 'absolute',
                zIndex: '-1',
                marginLeft: `${index * 170}px`
            }} key={index}>
                <Image                    
                    eixoX={index}
                    eixoY={0}
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
            (index) => this.renderizarImagem(index)
        );

        return (
            <ul style={ul}>                
                {lista}
            </ul>            
        )
    }


    handleStart(e,clientX) {
        if (this.onClick) {
            e.stopPropagation()
            return;
        }        
        let manipularEvento = this.state.manipularEvento;
        manipularEvento.iniciar(clientX);
        this.setState({ manipularEvento: manipularEvento });
    }
    handleMove(e,clientX) {
        if (this.onClick) {
            e.stopPropagation()
            return;
        }        
        let manipularEvento = this.state.manipularEvento;
        manipularEvento.mover(clientX);
        this.setState({ manipularEvento: manipularEvento });
    }
    handleEnd() {        
        let manipularEvento = this.state.manipularEvento;
        manipularEvento.atualizar();
        this.setState({ manipularEvento: manipularEvento });
    }

    onTouchStart(e) {
        e.preventDefault();
        this.handleStart(e,e.targetTouches[0].clientX);        
    }
    onTouchMove(e) {
        e.preventDefault();
        this.handleMove(e,e.targetTouches[0].clientX);
    }
    onTouchEnd() { 
        this.handleEnd();
    }  

    render() {
        const cor = this.props.valorInvalido ? '#d50000' : '#cccccc';
        const estiloDiv = {
            boxSizing: 'border-box',
            border: `1px solid ${cor}`,
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
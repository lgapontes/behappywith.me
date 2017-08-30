import React from 'react'
import Image from '../Image'
import ButtonImage from '../ButtonImage'
import HandleEvent from './HandleEvent'

class ImageSelector extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            handleEvent: new HandleEvent(
                -3465,
                105,                
                170,
                this.props.selecionado
            )
        }
    }

    renderizarButtonImage(posicao) {
        return (
            <ButtonImage                
                tipo='image-scroller'
                posicao={posicao}
                onClick={e => {
                    e.preventDefault();                                        
                    let handle = this.state.handleEvent;
                    handle.index += (posicao == 'esquerda') ? -1 : 1;                    
                    this.setState({ handleEvent: handle });
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
        const ms = this.state.handleEvent.beingTouched
            ? '100ms' : '800ms'

        const ul = {
            WebkitTransitionDuration: ms, /* Safari */
            transitionDuration: ms,

            listStyleType: 'none',
            margin: '0',
            padding: '0',
            position: 'relative',
            width: '3910px',
            left: `${this.state.handleEvent.left}px`
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

    onTouchStart(e) {
        e.preventDefault();
        let handle = this.state.handleEvent;
        handle.start(e.targetTouches[0].clientX);
        this.setState({ handleEvent: handle });
    }
    onTouchMove(e) {       
        e.preventDefault();
        let handle = this.state.handleEvent;
        handle.move(e.targetTouches[0].clientX);
        this.setState({ handleEvent: handle });
    }
    onTouchEnd() {
        let handle = this.state.handleEvent;
        handle.end();        
        this.setState({ handleEvent: handle });
    }
    onMouseDown(e) {        
        e.preventDefault();        
        let handle = this.state.handleEvent;
        handle.start(e.clientX);
        this.setState({ handleEvent: handle });
    }
    onMouseMove(e) {
        e.preventDefault();
        let handle = this.state.handleEvent;
        handle.move(e.clientX);
        this.setState({ handleEvent: handle });
    }
    onMouseUp(e) {        
        let handle = this.state.handleEvent;
        handle.end();
        this.setState({ handleEvent: handle });
    }
    onMouseLeave() {
        this.onMouseUp();
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
                onMouseDown={this.onMouseDown.bind(this)}
                onMouseMove={this.onMouseMove.bind(this)}
                onMouseUp={this.onMouseUp.bind(this)}
                onMouseLeave={this.onMouseLeave.bind(this)}
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
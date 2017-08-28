import React from 'react'
import Image from '../Image'
import ButtonImage from '../ButtonImage'

import './slick/slick.css'
import './slick/slick-theme.css'
import './slick/slick.min.js'

class ImageSelector extends React.Component {
    constructor(props) {
        super(props)
    }

    renderizarButtonImage(posicao) {
        return (
            <ButtonImage
                tipo='image-scroller'
                posicao={posicao}
            />
        )
    }
    renderizarImagens() {
        const ul = {
            listStyleType: 'none',
            margin: '0',
            padding: '0'
        }
        const li = {
            marginTop: '10px',
            position: 'absolute',
            zIndex: '-1'
        }

        const elementos = Array.from(
            new Array(this.props.elementos), (x,i) => i
        );
        const lista = elementos.map((index) =>
            <li style={{
                marginTop: '10px',
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
        );

        return (
            <ul style={ul}>                
                {lista}
            </ul>
        )
    }
    renderizarSpan() {
        const estiloSpan = {
            backgroundColor: 'rgba(189, 189, 189, 0.3)',
            height: '193px',
            width: '180px',
            float: 'left',
            marginLeft: '55px',
            zIndex: '1'
        }
        return <span style={estiloSpan}></span>
    }

    render() {
        const cor = this.props.valorInvalido ? '#d50000' : '#cccccc';
        const estiloDiv = {
            boxSizing: 'border-box',
            border: `1px solid ${cor}`,
            borderRadius: '5px',        
            width: '380px',
            height: '195px'
        };
        
        return (
            null
        )

        /*
        return (
            <div style={estiloDiv}>
                {this.renderizarButtonImage('esquerda')}
                {this.renderizarImagens()}
                {this.renderizarSpan()}
                {this.renderizarButtonImage('direita')}
            </div>
        )
        */
    }
}

export default ImageSelector;
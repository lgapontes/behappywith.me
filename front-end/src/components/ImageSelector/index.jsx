import React from 'react'
import Image from '../Image'
import ButtonImage from '../ButtonImage'

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

    renderizarImagem(index) {
        return (
            <li style={{
                paddingTop: '10px',
                paddingBottom: '13px',
                position: 'absolute',
                zIndex: '-1',
                marginLeft: `${index * 170}px`,
                backgroundColor: (index == this.props.selecionado) ?
                    'rgba(0, 200, 83, 0.3)' : 'none'
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
        const ul = {
            listStyleType: 'none',
            margin: '0',
            padding: '0',
            position: 'relative',
            width: '3910px',
            left: '105px'
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
            <div style={estiloDiv}>
                {this.renderizarButtonImage('esquerda')}
                {this.renderizarImagens()}                
                {this.renderizarButtonImage('direita')}
            </div>
        )
    }
}

export default ImageSelector;
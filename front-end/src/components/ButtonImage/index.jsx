import React from 'react'
import './index.css'
import Image from '../Image'

export default function ButtonImage(props) {    
    let estilo = {};
    let index = 0;
    if (props.posicao === 'direita') {
        estilo.float = 'right'
        index = 1
    } else {
        estilo.float = 'left'
        index = 0
    }
    const tamanho = 30;

    let propriedades = Object.assign({},props);        
    delete propriedades.posicao;

    return (
        <div
            style={estilo}
            className='option-image-scroller'
            {...propriedades}
        >
            <Image
                eixoX={index}
                eixoY={0}
                width={tamanho}
                height={tamanho}
                backgroundHeight={tamanho}
                arquivo="img/botoes.png"
            />
        </div>
    )
}
import React from 'react'
import './index.css'
import Image from '../Image'

export default function ButtonImage(props) {
    let classe = ''
    let estilo = {}
    let tamanho = 48
    let index = props.index

    /* Tipos de botões */
    if (props.tipo === 'image-scroller') {
        classe = 'option-image-scroller'
        tamanho = 30

        if (props.posicao === 'direita') {
            estilo.float = 'right'
            index = 1
        } else {
            estilo.float = 'left'
            index = 0
        }
    }

    let propriedades = Object.assign({},props);
    delete propriedades.index;
    delete propriedades.tipo;
    delete propriedades.posicao;

    return (
        <div
            style={estilo}
            className={classe}
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
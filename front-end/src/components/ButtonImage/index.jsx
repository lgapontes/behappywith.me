import React from 'react'
import './index.css'
import Image from '../Image'

export default function ButtonImage(props) {    
    let estilo = {};
    let index = 0;
    let tamanho = 30;
    let classes = "";

    if (props.tipo === "image-scroller") {
        if (props.posicao === 'direita') {
            estilo.float = 'right'
            index = 1
        } else {
            estilo.float = 'left'
            index = 0
        }
        classes = 'option-image-scroller'
    }
    if (props.tipo === "realizar-gentileza") {
        index = 5
        if (props.readOnly) {
            classes = 'option-gentileza-realizada'
        } else {
            classes = 'option-realizar-gentileza'   
        }
        tamanho = 28
    }
    if (props.tipo === "cancelar-gentileza") {
        index = 4        
        classes = 'option-cancelar-gentileza'
        tamanho = 28
    }
    if (props.tipo === "mais-gentilezas") {
        index = 2
        classes = 'option-mais-gentilezas'
        tamanho = 28
    }
    if (props.tipo === "header-menu") {
        index = 6
        classes = 'option-header-menu'
        tamanho = 48
    }

    let propriedades = Object.assign({},props);        
    delete propriedades.posicao;
    delete propriedades.tipo;
    delete propriedades.readOnly;

    return (
        <div
            style={estilo}
            className={classes}
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
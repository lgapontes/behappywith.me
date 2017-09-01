import React from 'react'
import './index.css'
import IconImage from '../IconImage'

export default function ButtonImage(props) {

    let classe = ''
    let estilo = {}
    let pequeno = false
    let index = props.index

    if (props.tipo === 'image-scroller') {
        classe = 'option-image-scroller'
        pequeno = true

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
            <IconImage pequeno={pequeno} index={index} />
        </div>
    )
}
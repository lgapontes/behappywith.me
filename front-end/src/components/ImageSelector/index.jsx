import React from 'react'
import ButtonImage from '../ButtonImage'

export default function ImageSelector(props) {
    const cor = props.valorInvalido ? '#d50000' : '#cccccc';
    const estilo = {
        boxSizing: 'border-box',
        border: `1px solid ${cor}`,
        borderRadius: '5px',
        padding: '3px',
        width: '380px',
        height: '195px',
    };

    return (
        <div style={estilo}>
            <ButtonImage
                tipo='image-scroller'
                posicao='esquerda'
            />
            <ButtonImage
                tipo='image-scroller'
                posicao='direita'
            />
        </div>
    )
}
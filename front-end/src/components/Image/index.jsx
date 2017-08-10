import React from 'react'
import './avatars.png'

export default function Image(props) {
    const eixoX = props.codigo * 170 + 'px';
    const eixoY = props.genero === 'm' ? '0px' : '170px';

    const estilo = {
        backgroundImage: 'url(img/avatars.png)',
        backgroundPositionX: eixoX,
        backgroundPositionY: eixoY,
        width: '170px',
        height: '170px',
        display: 'table',
        margin: '5px auto',        
    };

    return (
        <div style={estilo}>
        </div>
    )
}
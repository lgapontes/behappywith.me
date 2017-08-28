import React from 'react'
import Image from '../Image'

export default function OptionImage(props) {
    let tamanho = props.pequeno ? 30 : 48;
    
    return (
        <Image
            eixoX={props.index}
            eixoY={0}
            width={tamanho}
            height={tamanho}
            backgroundHeight={tamanho}
            arquivo="img/botoes.png"
        />
    )
}
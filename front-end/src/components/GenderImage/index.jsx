import React from 'react'
import Image from '../Image'

export default function GenderImage(props) {
    return (
        <Image
            eixoX={0}
            eixoY={(props.genero === 'm') ? 0 : 1}
            width={170}
            height={170}
            backgroundHeight={340}
            arquivo="img/avatars.png"
        />
    )
}
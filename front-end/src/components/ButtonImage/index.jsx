import React from 'react'
import './index.css'
import GenderImage from '../GenderImage'

export default function ButtonImage(props) {
    return (
        <a 
            className={
                props.selecionado ?
                "button-image button-image-selecionado" :
                "button-image"
            }
            href="#!"
            onClick={e => props.atualizar(props.genero)}
        >
            <GenderImage
                codigo={props.codigo}
                genero={props.genero}
            />
        </a>
    )
}
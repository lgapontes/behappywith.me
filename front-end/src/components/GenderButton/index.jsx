import React from 'react'
import './index.css'
import GenderImage from '../GenderImage'

export default function GenderButton(props) {
    return (
        <a 
            className={
                props.selecionado ?
                "gender-button gender-button-selecionado" :
                "gender-button"
            }
            href="#!"
            onClick={e => props.atualizar(props.genero)}
        >
            <GenderImage
                genero={props.genero}
            />
        </a>
    )
}
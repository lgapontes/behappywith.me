import React from 'react'
import './index.css'
import ButtonImage from '../ButtonImage'

export default function DivSelector(props) {
    const masculino = props.genero==='m';
    const feminino = props.genero==='f';

    return (
        <div
            className={
                props.valorInvalido ?
                'div-selector div-selector-invalido' :
                'div-selector'
            }
        >
            <ButtonImage
                selecionado={masculino}
                codigo={0}
                genero={'m'}
                atualizar={props.atualizar}
            />
            <ButtonImage
                selecionado={feminino}
                codigo={0}
                genero={'f'}
                atualizar={props.atualizar}
            />
        </div>
    )
}
import React from 'react'
import GenderButton from '../GenderButton'

export default function GenderSelector(props) {
    const masculino = props.genero==='m';
    const feminino = props.genero==='f';

    const cor = props.valorInvalido ? '#d50000' : '#cccccc';
    const estilo = {
        boxSizing: 'border-box',
        border: `1px solid ${cor}`,
        borderRadius: '5px',
        padding: '2px',
        paddingBottom: '0'
    };

    return (
        <div style={estilo}>
            <GenderButton
                selecionado={masculino}                
                genero={'m'}
                atualizarGenero={props.atualizarGenero}
            />
            <GenderButton
                selecionado={feminino}                
                genero={'f'}
                atualizarGenero={props.atualizarGenero}
            />
        </div>
    )
}
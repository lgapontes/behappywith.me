import React from 'react'

export default function Input(props) {
    const estilo = {
        borderColor: props.valorInvalido ? '#d50000' : '#cccccc',
        backgroundColor: props.valorInvalido ? '#ffcdd2' : '#ffffff'
    };

    let propriedades = Object.assign({},props);
    delete propriedades.valorInvalido;

    return (
        <input
            type="text"
            style={estilo}
            {...propriedades}
        />
    )
}
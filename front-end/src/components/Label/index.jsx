import React from 'react';

export default function Label(props) {
    const estilo = {
        color: props.valorInvalido ? '#f44336' : '#444444'
    };

    return (
        <label
            style={estilo}
            htmlFor={props.htmlFor}>
            {props.texto}
        </label>
    );
}
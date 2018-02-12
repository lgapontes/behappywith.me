import React from 'react'
import './index.css'
import Image from '../Image'
import { withRouter } from 'react-router-dom'

const ButtonImage= withRouter(props => {    
    let estilo = {};
    let index = 0;
    let tamanho = 30;
    let classes = "";

    if (props.tipo === "image-scroller") {
        if (props.posicao === 'direita') {
            estilo.float = 'right'
            index = 1
        } else {
            estilo.float = 'left'
            index = 0
        }
        classes = 'option-image-scroller'
    }
    if (props.tipo === "realizar-gentileza") {
        index = 5
        if (props.readOnly) {
            classes = 'option-gentileza-realizada'
        } else {
            classes = 'option-realizar-gentileza'   
        }
        tamanho = 28
    }
    if (props.tipo === "cancelar-gentileza") {
        index = 4        
        classes = 'option-cancelar-gentileza'
        tamanho = 28
    }
    if (props.tipo === "mais-gentilezas") {
        index = 2
        classes = 'option-mais-gentilezas'
        tamanho = 28
    }
    if (props.tipo === "header-menu") {
        index = 6
        classes = 'option-header-menu'
        tamanho = 48
    }

    let propriedades = Object.assign({},props);        
    delete propriedades.posicao;
    delete propriedades.tipo;
    delete propriedades.readOnly;
    
    if (props.tipo === "header-menu") {
        propriedades.onTouchStart = (e) => {e.stopPropagation()}
        propriedades.onTouchMove = (e) => {e.stopPropagation()}
        propriedades.onTouchEnd = (e) => {e.stopPropagation()}
        propriedades.onClick = (e) => {
            e.preventDefault();
            props.history.push(props.url);
        }
    }
    delete propriedades.url;
    delete propriedades.match;
    delete propriedades.location;
    delete propriedades.history;
    delete propriedades.staticContext;

    return (
        <div
            style={estilo}
            className={classes}
            {...propriedades}
        >
            <Image
                eixoX={index}
                eixoY={0}
                width={tamanho}
                height={tamanho}
                backgroundHeight={tamanho}
                arquivo="img/botoes.png"
            />
        </div>
    )
})

export default ButtonImage;
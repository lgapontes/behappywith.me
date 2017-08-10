import React from 'react'
import './index.css'
import Image from '../Image'

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
            <Image
                codigo={props.codigo}
                genero={props.genero}
            />
        </a>
    )
}

/*class ButtonImage extends React.Component {
    constructor(props) {
        super(props);        
        this.state = {
            selecionado: props.selecionado
        }
        this.atualizar = props.atualizar;
        console.log(props.selecionado);
    }

    selecionar(e) {
        this.setState({
            selecionado: true
        });
        this.atualizar(this.props.genero);
    }

    render() {
        return (
            <a 
                className={
                    this.state.selecionado ?
                    "button-image button-image-selecionado" :
                    "button-image"
                }
                href="#!"
                onClick={this.selecionar.bind(this)}
            >
                <Image
                    codigo={this.props.codigo}
                    genero={this.props.genero}
                />
            </a>
        )
    }
}

export default ButtonImage;*/
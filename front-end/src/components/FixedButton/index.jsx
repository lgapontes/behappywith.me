import React from 'react'
import Image from '../Image'
import './index.css'
import { withRouter } from 'react-router-dom'

const FixedButton = withRouter(props => {
    let type = props.type ? props.type : "primary";
    const className = `fixed-button ${type} pure-button`;

    return (
        <button
            className={className}
            onClick={(e) => {
                e.preventDefault();
                if (props.url) {
                    props.history.push(props.url);
                } else {
                    props.onClick();
                }            
            }}
        >
            <Image
                eixoX={props.index}
                eixoY={0}
                width={48}
                height={48}
                backgroundHeight={48}
                arquivo="img/botoes.png"
            />
        </button>
    )
})

export default FixedButton;
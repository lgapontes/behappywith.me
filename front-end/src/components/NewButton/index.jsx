import React from 'react'
import Image from '../Image'
import './index.css'
import { withRouter } from 'react-router-dom'

const NewButton = withRouter(props => {
    return (
        <button
            className="fixed-button pure-button"
            onClick={(e) => {
                e.preventDefault();
                props.history.push('/gentileza');
            }}
        >
            <Image
                eixoX={3}
                eixoY={0}
                width={48}
                height={48}
                backgroundHeight={48}
                arquivo="img/botoes.png"
            />
        </button>
    )
})

export default NewButton;
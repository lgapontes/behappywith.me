import React from 'react'
import ButtonImage from '../ButtonImage'
import './index.css'
import './img/logo.png'

export default function Header() {
    return (        
        <div className="header pure-menu pure-menu-horizontal pure-menu-fixed">
            <a href="/"><img className="logo" src="img/logo.png" /></a>
            <h4 className="label">Agenda de Gentilezas</h4>
            <div className="menu">
                <ButtonImage                    
                    tipo="header-menu"
                    onTouchStart={e => e.stopPropagation()}
                    onTouchMove={e => e.stopPropagation()}
                    onTouchEnd={e => e.stopPropagation()}
                    onClick={e => {e.preventDefault()}}
                />
            </div>    
        </div>        
    );
}


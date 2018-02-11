import React from 'react';
import './index.css';

class ExibirGentileza extends React.Component {
    constructor(props) {
        super(props)
    }
    renderizarGentileza(gentileza,index) {
        const key = `${gentileza.descricao.replace(/\s/g, "")}-${index}`;
        const classNameFrase = "green";
        return (
            <div key={key} className="gentileza">
                <h3>{gentileza.descricao}</h3>
                <span className={classNameFrase}>{gentileza.frase}</span>
            </div>
        )
    }

    render() {
        const lista = this.props.gentilezas.map(
            (entry,index) => this.renderizarGentileza(entry,index)
        );

        return (
            <div className="center">
                {lista}                                
            </div>
        )
    }
}

export default ExibirGentileza;
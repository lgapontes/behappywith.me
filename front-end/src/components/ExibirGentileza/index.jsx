import React from 'react';
import ButtonImage from '../ButtonImage'
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
                <div className="title">
                    <h3>{gentileza.descricao}</h3>
                    <span className={classNameFrase}>{gentileza.frase.exibir()}</span>
                </div>
                <div className="buttons">
                    <ButtonImage
                        tipo="realizar-gentileza"

                        onTouchStart={e => e.stopPropagation()}
                        onTouchMove={e => e.stopPropagation()}
                        onTouchEnd={e => e.stopPropagation()}

                        onClick={e => {
                            e.preventDefault();
                        }}
                    />
                    <ButtonImage
                        tipo="cancelar-gentileza"

                        onTouchStart={e => e.stopPropagation()}
                        onTouchMove={e => e.stopPropagation()}
                        onTouchEnd={e => e.stopPropagation()}

                        onClick={e => {
                            e.preventDefault();
                        }}
                    />
                </div>
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
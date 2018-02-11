import React from 'react';
import ButtonImage from '../ButtonImage'
import './index.css';

class ExibirGentileza extends React.Component {
    constructor(props) {
        super(props)
    }
    renderizarGentileza(gentileza,index) {
        const key = `${gentileza.descricao.replace(/\s/g, "")}-${index}`;
        const classNameFrase = gentileza.frase.color;
        return (
            <div key={key} className="gentileza">
                <h3 className="title">{gentileza.descricao}</h3>                
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
                <span className={classNameFrase}>{gentileza.frase.exibir()}</span>
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
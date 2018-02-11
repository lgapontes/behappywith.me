import React from 'react';
import Image from '../Image';
import ButtonImage from '../ButtonImage';
import './index.css';

class ListarGentilezas extends React.Component {
    constructor(props) {
        super(props)
    }

    renderizarOpcoes(gentileza) {
        if (gentileza.estaExecutada()) {
            return (
                <div className="buttons">
                    <ButtonImage
                        tipo="realizar-gentileza"
                        readOnly={true}
                        onTouchStart={e => e.stopPropagation()}
                        onTouchMove={e => e.stopPropagation()}
                        onTouchEnd={e => e.stopPropagation()}    
                        onClick={e => {e.preventDefault();}}
                    />                    
                </div>
            )
        } else {
            return (
                <div className="buttons">
                    <ButtonImage
                        tipo="realizar-gentileza"
    
                        onTouchStart={e => e.stopPropagation()}
                        onTouchMove={e => e.stopPropagation()}
                        onTouchEnd={e => e.stopPropagation()}
    
                        onClick={e => {
                            e.preventDefault();
                            this.props.executarGentileza(gentileza.uid);
                        }}
                    />
                    <ButtonImage
                        tipo="cancelar-gentileza"
    
                        onTouchStart={e => e.stopPropagation()}
                        onTouchMove={e => e.stopPropagation()}
                        onTouchEnd={e => e.stopPropagation()}
    
                        onClick={e => {
                            e.preventDefault();
                            this.props.excluirGentileza(gentileza.uid);
                        }}
                    />
                </div>
            )
        }
    }

    renderizarIcones(gentileza) {
        return (
            <ul>
                <li>
                    <Image
                        eixoX={gentileza.index}
                        eixoY={0}
                        width={90}
                        height={90}
                        backgroundHeight={180}
                        arquivo="img/gentilezas.png"
                    />
                </li>
                <li className="icone-ligacao">
                    <Image
                        eixoX={3}
                        eixoY={0}
                        width={20}
                        height={20}
                        backgroundHeight={20}
                        arquivo="img/botoes.png"
                    />
                </li>
                <li>
                    <Image
                        eixoX={gentileza.destinatario.index}
                        eixoY={1}
                        width={90}
                        height={90}
                        backgroundHeight={180}
                        arquivo="img/gentilezas.png"
                    />
                </li>
                <li className="icone-ligacao">
                    <Image
                        eixoX={1}
                        eixoY={0}
                        width={20}
                        height={20}
                        backgroundHeight={20}
                        arquivo="img/botoes.png"
                    />
                </li>
                <li className="icone-xp">
                    +{gentileza.obterXP()}XP
                </li>
            </ul>
        )
    }

    renderizarGentileza(gentileza,index) {
        const key = `${gentileza.descricao.replace(/\s/g, "")}-${index}`;
        const classNameFrase = gentileza.frase.color;
        return (
            <div key={key} className="gentileza">
                <h3 className="title">{gentileza.descricao}</h3>                
                {this.renderizarOpcoes(gentileza)}            
                <span className={classNameFrase}>{gentileza.frase.exibir()}</span>
                {this.renderizarIcones(gentileza)}
            </div>
        )
    }

    render() {
        const lista = this.props.gentilezas.filter(entry => 
            !entry.estaExcluida()
        ).map(
            (entry,index) => this.renderizarGentileza(entry,index)
        );

        return (
            <div className="center">
                {lista}                                
            </div>
        )
    }
}

export default ListarGentilezas;
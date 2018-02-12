import React from 'react';
import Image from '../Image';
import ButtonImage from '../ButtonImage';
import './index.css';

const EXIBICAO = 10;

class ListarGentilezas extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            totalExibicao: EXIBICAO,
            fadeout: false 
        }
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
        let arquivo = "";
        let classNameIconeLigacao = "";
        let classNameXP = "";
        if (gentileza.estaExecutada()) {
            arquivo = 'img/gentilezas-realizadas.png';
            classNameIconeLigacao = "icone-ligacao gray";
            classNameXP = "icone-xp gray";            
        } else {
            arquivo = 'img/gentilezas.png';
            classNameIconeLigacao = "icone-ligacao";
            classNameXP = "icone-xp";
        }

        return (
            <ul>
                <li>
                    <Image
                        eixoX={gentileza.index}
                        eixoY={0}
                        width={90}
                        height={90}
                        backgroundHeight={180}
                        arquivo={arquivo}
                    />
                </li>
                <li className={classNameIconeLigacao}>
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
                        arquivo={arquivo}
                    />
                </li>
                <li className={classNameIconeLigacao}>
                    <Image
                        eixoX={1}
                        eixoY={0}
                        width={20}
                        height={20}
                        backgroundHeight={20}
                        arquivo="img/botoes.png"
                    />
                </li>
                <li className={classNameXP}>
                    +{gentileza.obterXP()}xp
                </li>
            </ul>
        )
    }

    renderizarGentileza(gentileza,index) {
        const key = `${gentileza.descricao.replace(/\s/g, "")}-${index}`;
        const classNameFrase = gentileza.frase.color;
        const classNameH3 = gentileza.estaExecutada() ? "title gray" : "title";

        return (
            <div key={key} className="gentileza">
                <h3 className={classNameH3}>{gentileza.descricao}</h3>                
                {this.renderizarOpcoes(gentileza)}            
                <span className={classNameFrase}>{gentileza.frase.exibir()}</span>
                {this.renderizarIcones(gentileza)}
            </div>
        )
    }
    renderizarMaisGentilezas(contador) {
        if (this.state.totalExibicao >= contador) {
            return null
        } else {
            return (
                <ButtonImage
                    tipo="mais-gentilezas"
    
                    onTouchStart={e => e.stopPropagation()}
                    onTouchMove={e => e.stopPropagation()}
                    onTouchEnd={e => e.stopPropagation()}
    
                    onClick={e => {
                        e.preventDefault();
                        let totalExibicao = this.state.totalExibicao + EXIBICAO;
                        this.setState({
                            totalExibicao: totalExibicao
                        });
                    }}
                />
            )
        }
    }

    renderizarTimestamp() {
        if (this.props.showTimeStamp) {
            let timestamp = this.props.timestamp;
            let className = "";
            if (this.state.fadeout) {
                className = "timestamp timestamp-fadeout pure-menu pure-menu-horizontal pure-menu-fixed";
            } else {
                className = "timestamp pure-menu pure-menu-horizontal pure-menu-fixed";                
            }             
            return (
                <div className={className}>
                    Atualizado em {timestamp}
                </div>
            )
        } else {
            return null
        }
    }

    componentDidMount() {
        if (this.props.showTimeStamp && !this.state.fadeout) {
            setTimeout(() => {
                this.setState({
                    fadeout: true
                });
            },3000);            
        }
        if (this.props.showTopScreen) {
            window.scrollTo(0, 0);
        }
    }

    render() {
        let contador = 0;
        const lista = this.props.gentilezas.filter(entry => {
            if (entry.estaExcluida()) {
                return false;
            } else {
                contador = contador + 1;
                return true;
            }
        }).slice(0, this.state.totalExibicao).map(
            (entry,index) => this.renderizarGentileza(entry,index)
        );

        return (
            <div className="center">
                {this.renderizarTimestamp()}
                {lista}
                {this.renderizarMaisGentilezas(contador)}
            </div>
        )
    }
}

export default ListarGentilezas;
import React from 'react';
import Image from '../Image';
import FixedButton from '../FixedButton';
import './index.css';

// https://stackoverflow.com/questions/7342957/how-do-you-round-to-1-decimal-place-in-javascript
function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

function texto(total) {
    if (total == 1) {
        return "gentileza";
    }
    return "gentilezas"
}

export default function PerfilUsuario(props) {

    let eixoY = props.usuario.genero === 'm' ? 0 : 1;
    let totalGentilezas = props.usuario.gentilezas.length;
    let totalAtrasadas = 0;
    let totalExcluidas = 0;
    
    let totalXP = props.usuario.gentilezas.filter(entry => {
        if (entry.estaExecutada()) {
            if (entry.foiExecutadaComAtraso()) {
                totalAtrasadas = totalAtrasadas + 1;
            }
            return true;
        } else {
            if (entry.estaExcluida()) {
                totalExcluidas = totalExcluidas + 1;
            }
        }
        return false;
    }).reduce((xp,entry) => {
        return xp + entry.obterXP() 
    }, 0);

    let totalRealizadas = totalGentilezas - (totalAtrasadas + totalExcluidas);

    let xp = "";
    if (totalXP > 1000) {
        xp = `${round(totalXP / 1000,1)} k`
    } else {
        xp = `${totalXP} xp`
    }

    return (
        <div className="center">
            <section className="header-perfil">
                <h2>{props.usuario.nome}</h2>
                <div className="left">
                    <Image
                        eixoX={props.usuario.avatar.index}
                        eixoY={eixoY}
                        width={140}
                        height={140}
                        backgroundHeight={280}
                        arquivo="img/avatars.png"
                    />
                </div>
                <div className="right">
                    {xp}
                </div>
                <hr />
            </section>            
            <section className="labels-perfil">
                <h4>Total de {totalGentilezas} {texto(totalGentilezas)}</h4>
                <h4>Atrasou na realização de {totalAtrasadas} {texto(totalAtrasadas)}</h4>
                <h4>Cancelou {totalExcluidas} {texto(totalExcluidas)}</h4>
                <h4>Realizou {totalRealizadas} {texto(totalRealizadas)} no prazo</h4>
            </section>
            <FixedButton
                index="0"
                type="secondary"
                url="/"
            />
        </div>
    )
}
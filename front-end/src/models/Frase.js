import TimeStamp from './TimeStamp';

const A_FAZER = [
    ["Envie um zap","ao seu","aos seus","para"],
    ["Dê bom dia","ao seu","aos seus","para"],
    ["Ligue","para seu","para seus","para"],
    ["Aperte a mão","de seu","de seus","de"],
    ["Abrace","seu","seus",""],
    ["Dê um doce","ao seu","aos seus","para"],
    ["Presenteie","seu","seus",""]
];
const ATRASADO = [
    ["Você devia ter enviado um zap","ao seu","aos seus","para"],
    ["Você devia ter dado bom dia","ao seu","aos seus","para"],
    ["Você devia ter ligado","para seu","para seus","para"],
    ["Você devia ter apertado a mão","de seu","de seus","de"],
    ["Você devia ter abraçado","seu","seus",""],
    ["Você devia ter dado um doce","ao seu","aos seus","para"],
    ["Você devia ter presenteado","seu","seus",""]
];
const FEITO = [
    ["Você enviou um zap","ao seu","aos seus","para"],
    ["Você deu bom dia","ao seu","aos seus","para"],
    ["Você ligou","para seu","para seus","para"],
    ["Você apertou a mão","de seu","de seus","de"],
    ["Você abraçou","seu","seus",""],
    ["Você deu um doce","ao seu","aos seus","para"],
    ["Você presenteou","seu","seus",""]
];

const SINGULAR = 1;
const PLURAL = 2;
const DESCONHECIDO = 3;

const DESTINATARIOS = [
    ["pais",PLURAL],
    ["filhos",PLURAL],
    ["cônjuge",SINGULAR],
    ["amigos",PLURAL],
    ["pets",PLURAL],
    ["alguém",DESCONHECIDO]
];

function montarInicioFrase(gentileza,destinatario,frases) {
    let frase = frases[gentileza][0] + " " +
        frases[gentileza][DESTINATARIOS[destinatario][1]] + " " +
        DESTINATARIOS[destinatario][0];
    return frase;
}

class Frase {
    constructor(indexGentileza,indexDestinatario,dataLimite,dataExecucao) {
        this.indexGentileza = indexGentileza;
        this.indexDestinatario = indexDestinatario;
        this.agora = new Date();
        this.dataLimite = dataLimite.toDate();
        if (dataExecucao) {
            this.dataExecucao = dataExecucao.toDate();
            this.color = "gray";
        } else {
            this.dataExecucao = undefined;
            if (this.dataLimite < this.agora) {
                this.color = "orange";
            } else {
                this.color = "green";
            }
        }
    }

    exibir() {
        if (this.dataExecucao) {
            /* Já foi executada */
            let tempo = TimeStamp.diferencaDescritiva(this.dataExecucao,this.agora)
            let frase = `${montarInicioFrase(this.indexGentileza,this.indexDestinatario,FEITO)} há ${tempo}`;
            return frase; 
        } else {
            /* Não foi executada */
            if (this.dataLimite < this.agora) {
                /* Está atrasada */
                let tempo = TimeStamp.diferencaDescritiva(this.dataLimite,this.agora)
                let frase = `${montarInicioFrase(this.indexGentileza,this.indexDestinatario,ATRASADO)} há ${tempo}`;
                return frase;
            } else {
                /* Ainda não foi feita */
                let tempo = TimeStamp.diferencaDescritiva(this.agora,this.dataLimite)
                let frase = `${montarInicioFrase(this.indexGentileza,this.indexDestinatario,A_FAZER)} em ${tempo}`;
                return frase;
            }
        }
    }
}

export default Frase;
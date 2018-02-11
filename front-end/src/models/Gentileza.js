import Destinatario from './Destinatario'
import TimeStamp from './TimeStamp';

const ABERTA = 0;
const EXCLUIDA = 1;
const REALIZADA_NO_PRAZO = 2;
const REALIZADA_COM_ATRASO = 3;

const FRASES = [
    [
        "Envie um zap aos seus pais",
        "Envie um zap aos seus filhos",
        "Envie um zap ao seu cônjuge",
        "Envie um zap aos seus amigos",
        "", // Não aplicável
        "Envie um zap para alguém"
    ],
    [
        "Dê bom dia aos seus pais",
        "Dê bom dia aos seus filhos",
        "Dê bom dia ao seu cônjuge",
        "Dê bom dia aos seus amigos",
        "Dê bom dia aos seus pets",
        "Dê bom dia para alguém"
    ],
    [
        "Ligue para seus pais",
        "Ligue para seus filhos",
        "Ligue para seu cônjuge",
        "Ligue para seus amigos",
        "", // Não aplicável
        "Ligue para alguém"
    ],
    [
        "Aperte a mão de seus pais",
        "Aperte a mão de seus filhos",
        "Aperte a mão de seu cônjuge",
        "Aperte a mão de seus amigos",
        "", // Não aplicável
        "Aperte a mão de alguém"
    ],
    [
        "Abrace seus pais",
        "Abrace seus filhos",
        "Abrace seu cônjuge",
        "Abrace seus amigos",
        "Abrace seus pets",
        "Abrace alguém"
    ],
    [
        "Dê um doce aos seus pais",
        "Dê um doce aos seus filhos",
        "Dê um doce aos seu cônjuge",
        "Dê um doce aos seus amigos",
        "Dê um doce aos seus pets",
        "Dê um doce para alguém"
    ],
    [
        "Presenteie seus pais",
        "Presenteie seus filhos",
        "Presenteie seu cônjuge",
        "Presenteie seus amigos",
        "Presenteie seus pets",
        "Presenteie alguém"
    ]
];

function callbackTodos() {
    return Destinatario.obterTodos();
}
function callbackPessoas() {
    return Destinatario.obterTodasPessoas();
}

class Gentileza {
    constructor(index,descricao,xp,callback) {
        this.index = index;
        this.descricao = descricao;
        this.xp = xp;
        this.status = ABERTA;
        this.destinatario = undefined;
        this.dataCriacao = undefined;
        this.dataLimite = undefined;
        this.dataExecucao = undefined;
        this.frase = undefined;        
        this.obterDestinatarios = callback;
    }
    toString() {
        return this.descricao;
    }
    inicializarDados() {
        this.dataCriacao = new TimeStamp();
        this.dataLimite = TimeStamp.adicionarUmDia(this.dataCriacao);
        this.frase = FRASES[this.index][this.destinatario.index];
    }
    static parse(json) {
        let gentileza = Gentileza.obterTodos()[json.index];
        gentileza.destinatario = Destinatario.parse(json.destinatario)        
        gentileza.status = parseInt(json.status);
        gentileza.dataCriacao = new TimeStamp(json.dataCriacao);
        gentileza.dataLimite = new TimeStamp(json.dataLimite);
        if (gentileza.status > 1) {
            gentileza.dataExecucao = new TimeStamp(json.dataExecucao);
        }
        gentileza.frase = json.frase;
        return gentileza;
    }
    static obterTodos() {
        let gentilezas = [
            new Gentileza(0,"Zap",5,callbackPessoas),
            new Gentileza(1,"Bom dia",7,callbackTodos),
            new Gentileza(2,"Ligação",7,callbackPessoas),
            new Gentileza(3,"Aperto de Mãos",7,callbackPessoas),
            new Gentileza(4,"Abraço",10,callbackTodos),
            new Gentileza(5,"Doce",15,callbackTodos),
            new Gentileza(6,"Presente",20,callbackTodos)
        ];
        return gentilezas;
    }
}

export default Gentileza;
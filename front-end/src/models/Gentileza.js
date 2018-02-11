import Destinatario from './Destinatario'
import TimeStamp from './TimeStamp';
import Frase from './Frase';

const ABERTA = 0;
const EXCLUIDA = 1;
const REALIZADA_NO_PRAZO = 2;
const REALIZADA_COM_ATRASO = 3;

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
        this.dataLimite = TimeStamp.adicionarSeisHoras(this.dataCriacao.toDate());
        this.frase = new Frase(
            this.index,
            this.destinatario.index,
            this.dataLimite,
            this.dataExecucao
        );
    }
    obterXP() {
        let agora = new Date();
        let redutor = 0;
        if (this.dataLimite.toDate() < agora) {
            let diff = TimeStamp.diferenca(this.dataLimite.toDate(),agora);
            if (diff.dias > 0) {
                redutor = 3;
            } else if (diff.horas >= 12) {
                redutor = 2;
            } else {
                redutor = 1;
            }
        }
        return this.xp - redutor;
    }
    static parse(json) {
        let gentileza = Gentileza.obterTodos()[json.index];
        gentileza.destinatario = Destinatario.parse(json.destinatario)        
        gentileza.status = parseInt(json.status);
        gentileza.dataCriacao = new TimeStamp(new Date(json.dataCriacao.valor));
        gentileza.dataLimite = new TimeStamp(new Date(json.dataLimite.valor));
        if (gentileza.status > 1) {
            gentileza.dataExecucao = new TimeStamp(new Date(json.dataExecucao.valor));
        }
        gentileza.frase = new Frase(
            gentileza.index,
            gentileza.destinatario.index,
            gentileza.dataLimite,
            gentileza.dataExecucao
        );
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
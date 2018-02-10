import Destinatario from './Destinatario'

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
        this.destinatario = undefined;
        this.timestamp = undefined;
        this.obterDestinatarios = callback;
    }
    toString() {
        return this.descricao;
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
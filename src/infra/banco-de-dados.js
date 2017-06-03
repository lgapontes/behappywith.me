const propriedades = require(`../conf/${process.env.NODE_ENV}`);
const MongoClient = require('mongodb').MongoClient;

class BancoDeDados {    
    constructor() {
        this.db = undefined;

        process.on('SIGINT', () => {    
            if (this.estaConectado()) {
                this.fechar();
            }
            process.exit(0); 
        });
    }
    conectar(callback = () => {return;}) {
        MongoClient.connect(propriedades.mongodb.url, (error, db) => {
            if (error) callback(error);
            else {
                this.db = db;
                callback();
            }
        });
    }
    fechar(callback) {
        this.db.close( error => {
            this.db = undefined;
            callback(error);
        });
    }
    estaConectado() {               
        return ! this.estaDesconectado();
    }
    estaDesconectado() {
        return (this.db === undefined);        
    }
    obterColecao(nomeColecao) {
        return this.db.collection(nomeColecao);
    }
}

const bancoDeDados = new BancoDeDados();
module.exports = bancoDeDados;
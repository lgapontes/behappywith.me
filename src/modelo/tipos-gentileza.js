const bancoDeDados = require('../infra/banco-de-dados');
const colecao = 'tiposGentileza';
class TiposGentileza {    
    static getAll(callback) {
        bancoDeDados.obterColecao(colecao).find({}).toArray(function(error, docs) {            
            callback(error,docs);
        });
    }
}

module.exports = TiposGentileza;
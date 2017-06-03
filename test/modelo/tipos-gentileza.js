const assert = require('assert');
const bancoDeDados = require('../../bin/infra/banco-de-dados');
const TiposGentileza = require('../../bin/modelo/tipos-gentileza');

describe('Tipos de Gentileza', function() {    
    describe('#Testar modelo', function() {        
        before(function(done){
            bancoDeDados.conectar( () => done() );
        });
        it('Obtem todos', function() {            
            let esperado = [
                { name: 'Zap', xp: 5 },
                { name: 'Bom dia', xp: 7 },
                { name: 'Ligação', xp: 7 },
                { name: 'Aperto de mãos', xp: 7 },
                { name: 'Abraço', xp: 10 },
                { name: 'Doce', xp: 15 },
                { name: 'Presente', xp: 20 }
            ];

            TiposGentileza.getAll((error,data) => {
                let obtido = data.map(entry => {
                    delete entry._id
                    return entry
                });
                assert.deepEqual(esperado,obtido);
            });
        });        
    });    
});
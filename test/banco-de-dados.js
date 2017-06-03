const assert = require('assert');
const bancoDeDados = require('../bin/infra/banco-de-dados');

describe('MongoDB', function() {    
    describe('#Testar conexao', function() {        
        it('Esta desconectado?', function() {            
            assert.ok(bancoDeDados.estaDesconectado());
        });
        it('Conectar', function(done) {
            // Definir timeout maior no uso de MongoDB Atlas ou mlab
            // this.timeout(10000)
            bancoDeDados.conectar(
                error => {                    
                    assert.ok(error === undefined)
                    done()
                }
            );
        });
        it('Esta conectado?', function() {            
            assert.ok(bancoDeDados.estaConectado());
        });
        it('Desconectar', function() {            
            bancoDeDados.fechar( error => {
                assert.ok(error === undefined);
            });            
        });
        it('Esta desconectado?', function() {            
            assert.ok(bancoDeDados.estaDesconectado());
        });
    });    
});
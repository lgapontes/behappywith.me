// Arquivo componente.js
var Componente = {};
Componente.valorA = 'Valor de A';
Componente.funcaoB = function() {
    return 'Função B';
}

// Arquivo main.js
var a = Componente.valorA;
var b = Componente.funcaoB;
console.log(a);
console.log(b());
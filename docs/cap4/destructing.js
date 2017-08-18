var obj = {
    a: 'valor de a',
    b: 'valor de b'
};

// ECMAScript 5
var a = obj.a;
var b = obj.b;
console.log( a );
console.log( b );

// ECMAScript 6
var {a,b} = obj;

// ECMAScript 6 - outro exemplo
var {a,b} = obj;


var carros = ['fusca', 'uno', 'gol', 'ferrari'];

// ECMAScript 5
var carro0 = carros[0];
var carro3 = carros[3];
console.log(carro0); // fusca
console.log(carro3); // ferrari

// ECMAScript 6
var [carro0,,,carro3,carro4] = carros;
console.log(carro0); // fusca
console.log(carro3); // ferrari
console.log(carro4); // undefined
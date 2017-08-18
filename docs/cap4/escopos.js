var teste = 1;
{ // bloco interno
    var teste = 2;
    var outra = 3;
}
console.log(teste); // 2
console.log(outra); // 3
const propriedades = require(`./conf/${process.env.NODE_ENV}`);
const express = require('express');
const app = express();

const bancoDeDados = require('./infra/banco-de-dados');
bancoDeDados.conectar();

const TiposGentileza = require('./modelo/tipos-gentileza');

if (propriedades.formatarJson) app.set('json spaces', 4);

app.get('/',(req,res) => {
    res.send("Ok, está funcionando!");
});

app.get('/tipos-gentileza',(req,res) => {
    TiposGentileza.getAll((error,data) => {
        if (error) res.send(500,error);
        else res.json(data);
    });
});

app.listen(propriedades.porta,() => {
    console.log(`Servidor rodando na porta ${propriedades.porta}`);
});
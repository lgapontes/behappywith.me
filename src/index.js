const properties = require(`./conf/${process.env.NODE_ENV}`);
const express = require('express');
const app = express();

if (properties.humanJson) app.set('json spaces', 4);

app.get('/',(req,res) => {
    res.send("Ok, it's working!");
});

const repository = require('./infrastructure/repository');
app.get('/kindnessTypes',(req,res) => {
    res.json(repository.get('kindnessTypes'));
});

app.listen(properties.port,() => {
    console.log(`Server running on port ${properties.port}`);
});
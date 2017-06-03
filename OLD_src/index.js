const propriedades = require(`./conf/${process.env.NODE_ENV}`);
const express = require('express');
const app = express();

if (propriedades.formatarJson) app.set('json spaces', 4);

app.get('/',(req,res) => {
    res.send("Ok, it's working!");
});

app.listen(propriedades.porta,() => {
    console.log(`Server running on port ${propriedades.porta}`);
});
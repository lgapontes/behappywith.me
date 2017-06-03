const propriedades = require(`../conf/${process.env.NODE_ENV}`);
const mongoose = require('mongoose');

class Database {
    constructor() {
        mongoose.connect(propriedades.mongodb);       

        /* Eventos do MongoDB */
        mongoose.connection.on('connected', function () {  
            console.log(`MongoDB conectado em ${process.env.NODE_ENV}`);
        }); 
        mongoose.connection.on('error',function (error) {  
            console.log(`MongoDB: Erro ao conectar em ${process.env.NODE_ENV}: ${error}`);
        }); 
        mongoose.connection.on('disconnected', function () {  
            console.log(`MongoDB desconectado de ${process.env.NODE_ENV}`);
        });
        process.on('SIGINT', function() {  
            this.fechar();
        });
    }
    fechar() {
        mongoose.connection.close(function () { 
            console.log(`MongoDB encerrado de ${process.env.NODE_ENV}`);
            process.exit(0); 
        }); 
    }
    static estaConectado() {
        /*
            readyState:
                0 = disconnected
                1 = connected
                2 = connecting
                3 = disconnecting
        */        
        return (mongoose.connection.readyState === 1);
    }
    static estaDesconectado() {
        return ! Database.estaConectado();
    }
    obterConexao() {
        return mongoose.connection;
    }
}

module.exports = Database;



/*

let initialState = {
    users: [],
    kindness: [],
    kindnessTypes: [
        { id: 1, name: 'Zapzap', xp: 5 },
        { id: 2, name: 'Good Morning', xp: 7 },
        { id: 3, name: 'Phone call', xp: 7 },
        { id: 4, name: 'Handshake', xp: 7 },
        { id: 5, name: 'Hug', xp: 10 },
        { id: 6, name: 'Candy', xp: 15 },
        { id: 7, name: 'Gift', xp: 20 }
    ],
    helped: [
        { id: 1, name: 'Parents' },
        { id: 2, name: 'Brothers' },
        { id: 3, name: 'Children' },
        { id: 4, name: 'Partners' },
        { id: 5, name: 'Friends' },
        { id: 6, name: 'Colleagues' },
        { id: 7, name: 'Strangers' }
    ]
};
db.defaults(initialState).write();

function generateID(obj) {
    if (obj.id) throw new Error('This object already has an ID!');
    obj.id = uuidV4();
    return obj;
}

module.exports = {
    clear: () => {
        if (process.env.NODE_ENV === 'test')
            db.setState(initialState);
        else
            throw new Error('This method is only available for testing!');
    },
    get: (structure,criteria) =>
        criteria ? db.get(structure).find(criteria).value() :
        db.get(structure).value(),
    push: (structure,obj) => db.get(structure).push(generateID(obj)).write()
      [db.get(structure).size().value() - 1],
    unshift: (structure,obj) => db.get(structure).unshift(generateID(obj)).write()[0],
    put: (structure,criteria,obj) => {
      db.get(structure).find(criteria).assign(obj).write()
      return undefined
    },
    delete: (structure,criteria) => db.get(structure).remove(criteria).write()
};
*/
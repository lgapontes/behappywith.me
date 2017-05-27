const properties = require(`../conf/${process.env.NODE_ENV}`);
const low = require('lowdb');
const uuidV4 = require('uuid/v4');
const db = low(properties.db);

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
    obj.id = uuidV4();
    return obj;
}

module.exports = {
    clear: () => {
        db.setState(initialState);
    },
    post: (structure,obj) => db.get(structure).push(generateID(obj)).write(),
    get: (structure,criteria) =>
        criteria ? db.get(structure).find(criteria).value() :
        db.get(structure).value()
};
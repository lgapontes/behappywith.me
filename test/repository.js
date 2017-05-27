var assert = require('assert');
const repository = require("../bin/infrastructure/repository");

describe('Repository', function() {
    before(function() {
        repository.clear();
    });
    describe('#get', function() {
        it('Get all users', function() {
            assert.deepEqual([],repository.get('users'));
        });
        it('Get all kindness', function() {
            assert.deepEqual([],repository.get('kindness'));
        });
        it('Get all kindnessTypes', function() {
            assert.deepEqual(7,repository.get('kindnessTypes').length);
        });
        it('Get all helped', function() {
            assert.deepEqual(7,repository.get('helped').length);
        });
    });
    describe('#push', function() {
        it('Push new kindness', function() {
            let fake = {
              date: new Date(),
              likes: 0,
              text: 'Any text (push)...',
              kindnessType: { id: 1, name: 'Zapzap', xp: 5 },
              helped: { id: 1, name: 'Parents' }
            };
            let obj = repository.push('kindness',fake);
            delete obj.id;
            assert.deepEqual(obj,fake);
        });
        it('Push new kindness (to test return value)', function() {
            let fake = {
              date: new Date(),
              likes: 0,
              text: 'Other text (push)...',
              kindnessType: { id: 1, name: 'Zapzap', xp: 5 },
              helped: { id: 1, name: 'Parents' }
            };
            let obj = repository.push('kindness',fake);
            delete obj.id;
            assert.deepEqual(obj,fake);
        });
    });
    describe('#unshift', function() {
        it('Unshift new kindness', function() {
            let fake = {
              date: new Date(),
              likes: 0,
              text: 'Any text (unshift)...',
              kindnessType: { id: 1, name: 'Zapzap', xp: 5 },
              helped: { id: 1, name: 'Parents' }
            };
            let obj = repository.unshift('kindness',fake);
            delete obj.id;
            assert.deepEqual(obj,fake);
        });
        it('Unshift new kindness (to test return value)', function() {
            let fake = {
              date: new Date(),
              likes: 0,
              text: 'Other text (unshift)...',
              kindnessType: { id: 1, name: 'Zapzap', xp: 5 },
              helped: { id: 1, name: 'Parents' }
            };
            let obj = repository.unshift('kindness',fake);
            delete obj.id;
            assert.deepEqual(obj,fake);
        });
    });
    describe('#put', function() {
        it('Put (update) kindness', function() {
            let date = new Date()
            let oldText = `Text to find a kindness ${date}`
            let newText = `Text to update a kindness ${date}`
            let obj = repository.unshift('kindness',{
              date: new Date(),
              likes: 0,
              text: oldText,
              kindnessType: { id: 7, name: 'Gift', xp: 20 },
              helped: { id: 7, name: 'Strangers' }
            });
            obj.text = newText;
            repository.put('kindness',{ text: oldText },obj);
            let updated = repository.get('kindness',{ id: obj.id })
            assert.deepEqual(obj,updated);
        });
    });
    describe('#delete', function() {
        it('Delete kindness', function() {
            let text = `Text to delete a kindness ${new Date()}`
            let obj = repository.unshift('kindness',{
              date: new Date(),
              likes: 0,
              text: text,
              kindnessType: { id: 7, name: 'Gift', xp: 20 },
              helped: { id: 7, name: 'Strangers' }
            });
            repository.delete('kindness',{ text: text });
            let notFound = repository.get('kindness',{ text: text })
            assert.ok(notFound === undefined);
        });
    });
});

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
});
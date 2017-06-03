var assert = require('assert');
const repository = require("../bin/infrastructure/repository");
const KindnessType = require("../bin/model/kindnessType");
const Helped = require("../bin/model/helped");
const JsonBased = require("../bin/model/json-based");
const Kindness = require("../bin/model/kindness");
const User = require("../bin/model/user");

describe('Model', function() {
  before(function() {
      repository.clear();
  });
  describe('#KindnessType', function() {
      it('Get all', function() {
        assert.equal(7,KindnessType.getAll().length);
      });
      it('Get by id', function() {
        let obj = KindnessType.get(1);
        assert.deepEqual({ id: 1, name: 'Zapzap', xp: 5 },obj);
      });
      it('Is valid', function() {
        let validObject = { id: 1, name: 'Zapzap', xp: 5 };
        assert.ok(KindnessType.isValid(validObject));
      });
      it('Is invalid (one)', function() {
        let invalidObject = { id: 1, name: 'xpto', xp: 5 };
        assert.ok( ! KindnessType.isValid(invalidObject));
      });
      it('Is invalid (two)', function() {
        assert.ok( ! KindnessType.isValid(undefined));
      });
  });
  describe('#Helped', function() {
      it('Get all', function() {
        assert.equal(7,Helped.getAll().length);
      });
      it('Get by id', function() {
        let obj = Helped.get(1);
        assert.deepEqual({ id: 1, name: 'Parents' },obj);
      });
      it('Is valid', function() {
        let validObject = { id: 1, name: 'Parents' };
        assert.ok(Helped.isValid(validObject));
      });
      it('Is invalid (one)', function() {
        let invalidObject = { id: 1, name: 'xpto' };
        assert.ok( ! Helped.isValid(invalidObject));
      });
      it('Is invalid (two)', function() {
        assert.ok( ! Helped.isValid(undefined));
      });
  });
  describe('#JsonBased', function() {
      it('Constructor', function() {
        let json = {
          propertyOne: 'value1',
          propertyTwo: new Date
        };
        let obj = new JsonBased(json);
        assert.deepEqual(json,obj);
      });      
  });
  describe('#Kindness', function() {
      it('Get all', function() {
        assert.equal(0,Kindness.getAll().length);
      });
      it('isValid', function() {
        let obj = new Kindness({
          date: '2017-05-27',
          likes: 10,
          kindnessType: { id: 1, name: 'Zapzap', xp: 5 },
          helped: { id: 4, name: 'Partners' }
        })
        assert.ok(obj.isValid().yes());
      });
      it('Date is invalid', function() {
        let obj = new Kindness({
          date: '2017-05-40'
        })
        assert.deepEqual({ property: 'date', error: 'Invalid date!'},obj.isValid().errors[0]);
      });
      it('Likes is invalid', function() {
        let obj = new Kindness({
          date: '2017-05-20',
          likes: undefined
        })
        assert.deepEqual({ property: 'likes', error: 'Invalid likes!'},obj.isValid().errors[0]);
      });
      it('kindness type is invalid', function() {
        let obj = new Kindness({
          date: '2017-05-20',
          likes: 0,
          kindnessType: { id: 1, name: 'Zapzap', xp: 888 }
        })
        assert.deepEqual({ property: 'kindnessType', error: 'Invalid kindness type!'},obj.isValid().errors[0]);
      });
      it('Helped is invalid', function() {
        let obj = new Kindness({
          date: '2017-05-20',
          likes: 0,
          kindnessType: { id: 1, name: 'Zapzap', xp: 5 },
          helped: { id: 4, name: 'xpto' }
        })
        assert.deepEqual({ property: 'helped', error: 'Invalid helped!'},obj.isValid().errors[0]);
      });
      it('Full invalid', function() {
        let obj = new Kindness({
          date: '2017-05-50',
          likes: 'invalid',
          kindnessType: { id: 1, name: 'Zapzap', xp: 80 },
          helped: { id: 4, name: 'xpto' }
        })
        assert.deepEqual(4,obj.isValid().errors.length);
      });
  });
  describe('#User', function() {
      it('Get all', function() {
        assert.equal(0,User.getAll().length);
      });
      it('isValid', function() {
        let obj = new User({
          name: 'Alvarenga',
          email: 'email@lgapontes.com'
        })
        assert.ok(obj.isValid().yes());
      });
      it('Name is invalid', function() {
        let obj = new User({
          name: undefined
        })
        assert.deepEqual({ property: 'name', error: 'Invalid name!'},obj.isValid().errors[0]);
      });
      it('Email is invalid (one)', function() {
        let obj = new User({
          name: 'Alvarenga',
          email: undefined
        })
        assert.deepEqual({ property: 'email', error: 'Invalid email!'},obj.isValid().errors[0]);
      });
      it('Email is invalid (two)', function() {
        let obj = new User({
          name: 'Alvarenga',
          email: 'email@error'
        })
        assert.deepEqual({ property: 'email', error: 'Invalid email!'},obj.isValid().errors[0]);
      });
  });
});

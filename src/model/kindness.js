const moment = require('moment');
const repository = require("../infrastructure/repository");
const JsonBased = require("./json-based");
const KindnessType = require("./kindnessType");
const Helped = require("./helped");

const structure = 'kindness';

class Kindness extends JsonBased {
  static getAll() {
    return repository.get(structure).map( entry => {
      if (delete entry.id) return entry;
      throw new Error('Invalid object!')
    });
  }
  static isValid(obj) {
    let errors = [];
    if ( ! moment(obj.date, 'YYYY-MM-DD', true).isValid() ) {
      errors.push({ property: 'date', error: 'Invalid date!'});
    }
    if ( ! Number.isInteger(obj.likes) || (obj.likes < 0) ) {
      errors.push({ property: 'likes', error: 'Invalid likes!'});
    }
    if ( ! KindnessType.isValid(obj.kindnessType) ) {
      errors.push({ property: 'kindnessType', error: 'Invalid kindness type!'});
    }
    if ( ! Helped.isValid(obj.helped) ) {
      errors.push({ property: 'helped', error: 'Invalid helped!'});
    }
    return errors;
  }
  isValid() {
    return Kindness.isValid(this);
  }
  /*
  save() {
    if (this.id) {

    } else {
      repository.unshift(structure,this);
    }
  }
  */
}

module.exports = Kindness;

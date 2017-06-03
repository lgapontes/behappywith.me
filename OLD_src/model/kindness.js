const moment = require('moment');
const repository = require("../infrastructure/repository");
const Valid = require("./util/valid");
const JsonBased = require("./util/json-based");
const KindnessType = require("./kindnessType");
const Helped = require("./helped");

const structure = 'kindness';

class Kindness extends JsonBased {
  static getAll() {
    return repository.get(structure);
  }
  isValid() {
    let valid = new Valid(true);
    if ( ! moment(this.date, 'YYYY-MM-DD', true).isValid() ) {
      valid.addError({ property: 'date', error: 'Invalid date!'});
    }
    if ( ! Number.isInteger(this.likes) || (this.likes < 0) ) {
      valid.addError({ property: 'likes', error: 'Invalid likes!'});
    }
    if ( ! KindnessType.isValid(this.kindnessType) ) {
      valid.addError({ property: 'kindnessType', error: 'Invalid kindness type!'});
    }
    if ( ! Helped.isValid(this.helped) ) {
      valid.addError({ property: 'helped', error: 'Invalid helped!'});
    }
    return valid;
  }
  save() {
    let valid = this.isValid()
    return {
      success: callback => {
        if (valid.yes()) {
          let saved = repository.unshift(structure,this)
          this.id = saved.id          
          callback(saved)
        }
        return {
          error: callback => {
            if (valid.no()) callback(valid.errors)
          }
        }
      }
    }
  }
}

module.exports = Kindness;

const moment = require('moment');
const repository = require("../infrastructure/repository");
const Valid = require("./util/valid");
const JsonBased = require("./util/json-based");
const Email = require("./util/email");

const structure = 'users';

class User extends JsonBased {
  static getAll() {
    return repository.get(structure)
  }
  isValid() {
    let valid = new Valid(true);
    if ( (typeof this.name !== 'string') || (this.name.length == 0) ) {
      valid.addError({ property: 'name', error: 'Invalid name!'});
    }
    if ( ! Email.isValid(this.email) ) {
      valid.addError({ property: 'email', error: 'Invalid email!'});
    }
    if ( (typeof this.password !== 'string') || (this.password.length == 0) ) {
      valid.addError({ property: 'name', error: 'Invalid name!'});
    }
    return valid;
  }
}

module.exports = User;

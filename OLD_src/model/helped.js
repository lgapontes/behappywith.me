const repository = require("../infrastructure/repository");
const structure = 'helped';

class Helped {
  static getAll() {
    return repository.get(structure)
  }
  static get(id) {
    return repository.get(structure,{ id: id })
  }
  static isValid(obj) {
    if (obj && obj.id) {
      let validObject = Helped.get(obj.id);
      return JSON.stringify(validObject) === JSON.stringify(obj)
    }
    return false;
  }
}

module.exports = Helped;

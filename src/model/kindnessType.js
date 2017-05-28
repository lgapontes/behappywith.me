const repository = require("../infrastructure/repository");
const JsonBased = require("./json-based");
const structure = 'kindnessTypes';

class KindnessType {
  static getAll() {
    return repository.get(structure)
  }
  static get(id) {
    return repository.get(structure,{ id: id })
  }
  static isValid(obj) {
    if (obj && obj.id) {
      let validObject = KindnessType.get(obj.id);
      return JSON.stringify(validObject) === JSON.stringify(obj)
    }
    return false;
  }
}

module.exports = KindnessType;

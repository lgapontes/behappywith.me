class JsonBased {
  constructor(json) {
    if (json) {
      for (let property in json) {
        this[property] = json[property];
      }
    }
  }
}

module.exports = JsonBased;

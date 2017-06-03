class Valid {
  constructor(value = false) {
    this.valid = value
    this.errors = []
  }
  addError(error) {
    this.errors.push(error)
    this.valid = false;
  }
  yes() { return this.valid }
  no() { return ! this.valid }
}

module.exports = Valid;

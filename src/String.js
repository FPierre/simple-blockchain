module.exports = String.prototype.isValidDate = function () {
  return !!(Date.parse(this.valueOf()))
}

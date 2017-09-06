module.exports = Number.prototype.isPositive = function () {
  return /^[1-9]{1}\d*$/.test(this.valueOf())
}

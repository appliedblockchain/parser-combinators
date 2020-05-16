// @flow strict

const whileChar = require('./while-char')

const ws1 =
  whileChar(' \t\r\n', 1)

module.exports = ws1

// @flow

const whileChar = require('./while-char')

const ws0 =
  whileChar(_ => _ === '\x20' || _ === '\x0a' || _ === '\x0d' || _ === '\x09')

module.exports = ws0

// @flow

const decimal = require('./decimal')
const literal = require('../literal')
const map = require('../map')
const maybe = require('../maybe')
const sequence = require('../sequence')

/*:: import type { Parser } from '../types/parser' */

const signedDecimal /*: Parser<number> */=
  map(sequence(maybe(literal('-')), decimal), ([ sign, _ ]) => sign ? -_ : _)

module.exports = signedDecimal

// @flow

const pair = require('./pair')
const map = require('./map')

/*:: import type { Parser } from './types/parser' */

const right = /*:: <A, B> */(a /*: Parser<A> */, b /*: Parser<B> */) /*: Parser<B> */ =>
  map(pair(a, b), _ => _[1])

module.exports = right

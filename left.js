// @flow

const pair = require('./pair')
const map = require('./map')

/*:: import type { Parser } from './types/parser' */

const left = /*:: <A, B> */(a /*: Parser<A> */, b /*: Parser<B> */) /*: Parser<A> */ =>
  map(pair(a, b), _ => _[0])

module.exports = left

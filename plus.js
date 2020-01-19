// @flow

const star = require('./star')

/*:: import type { Parser } from './types/parser' */

const plus = /*:: <A> */(a /*: Parser<A> */) /*: Parser<A[]> */ =>
  star(a, 1)

module.exports = plus

// @flow strict

const pair = require('./pair')
const map = require('./map')

/*:: import type { Parser as P } from './types/parser' */

const left /*: <A, B>(P<A>, P<B>) => P<A> */ = /*:: <A, B> */
  (a, b) =>
    map(pair(a, b), _ => _[0])

module.exports = left

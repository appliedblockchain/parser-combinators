// @flow

const pair = require('./pair')
const map = require('./map')

/*:: import type { Parser as P } from './types/parser' */

const right /*: <A, B>(P<A>, P<B>) => P<B> */ = /*:: <A, B> */
  (a, b) =>
    map(pair(a, b), _ => _[1])

module.exports = right

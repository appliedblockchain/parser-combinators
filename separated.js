// @flow strict

const map = require('./map')
const sequence = require('./sequence')
const star = require('./star')
const right = require('./right')
const maybe = require('./maybe')

/*:: import type { Parser as P } from './types/parser' */

const separated /*: <A>(P<A>, P<mixed>) => P<A[]> */ = /*:: <A> */
  (a, s) =>
    map(sequence(maybe(a), star(right(s, a))), ([ first, rest ]) => (typeof first === 'undefined' ? [] : [ first, ...rest ]))

module.exports = separated

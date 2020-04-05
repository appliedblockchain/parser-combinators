// @flow

const map = require('./map')
const sequence = require('./sequence')
const star = require('./star')
const right = require('./right')
const maybe = require('./maybe')

/*::

import type { Parser } from './types/parser'

*/

const interpolated /*: <A>(Parser<A>, Parser<any>) => Parser<A[]> */ = /*:: <A> */
  (a, s) =>
    map(sequence(maybe(a), star(right(s, a))), ([ first, rest ]) => (typeof first === 'undefined' ? [] : [ first, ...rest ]))

module.exports = interpolated

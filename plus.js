// @flow

const star = require('./star')

/*:: import type { Parser as P } from './types/parser' */

const plus /*: <A>(P<A>) => P<A[]> */ = /*:: <A> */
  (a) =>
    star(a, 1)

module.exports = plus

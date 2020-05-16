// @flow strict

const Invalid = require('./invalid')

/*:: import type { Parser as P } from './types/parser' */

const predicate /*: <A>(P<A>, A => boolean) => P<A> */ = /*:: <A> */
  (a, f) =>
    input => {
      const [ s, r ] = a(input)
      if (!f(r)) {
        throw new Invalid(input)
      }
      return [ s, r ]
    }

module.exports = predicate

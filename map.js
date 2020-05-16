// @flow strict

/*:: import type { Parser as P } from './types/parser' */

const map /*: <B, A, F: A => B>(P<A>, A => B) => P<B> */ = /*:: <B, A, F> */
  (a, f) =>
    input => {
      const [ s, r ] = a(input)
      return [ s, f(r) ]
    }

module.exports = map

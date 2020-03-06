// @flow

/*:: import type { Parser as P } from './types/parser' */

const maybe /*: <A>(P<A>) => P<?A> */ = /*:: <A> */
  (a) =>
    input => {
      try {
        return a(input)
      } catch (err) {
        return [ input, undefined ]
      }
    }

module.exports = maybe

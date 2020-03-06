// @flow

/*:: import type { Parser as P } from './types/parser' */

const either /*: <A, B>(P<A>, P<B>) => P<A | B> */ = /*:: <A, B> */
  (a, b) =>
    input => {
      try {
        return a(input)
      } catch (err) {
        return b(input)
      }
    }

module.exports = either

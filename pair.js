// @flow

/*:: import type { Parser as P } from './types/parser' */

const pair /*: <A, B>(P<A>, P<B>) => P<[A, B]> */ = /*:: <A, B> */
  (a, b) =>
    input => {
      const [ sa, ra ] = a(input)
      const [ sb, rb ] = b(sa)
      return [ sb, [ ra, rb ] ]
    }

module.exports = pair

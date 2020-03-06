// @flow

/*:: import type { Parser as P } from './types/parser' */

const then /*: <A, B>(P<A>, A => P<B>) => P<B> */ = /*:: <A, B> */
  (a, f) =>
    input => {
      const [ s, r ] = a(input)
      return f(r)(s)
    }

module.exports = then

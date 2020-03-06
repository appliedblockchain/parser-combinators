// @flow

/*:: import type { Parser as P } from './types/parser' */

const times /*: <A>(P<A>, number) => P<A[]> */ = /*:: <A> */
  (a, n) =>
    input => {
      const r = []
      let s = input
      const eat = _ => ((s = _[0]), r.push(_[1]))
      for (let i = 0; i < n; i++) {
        eat(a(s))
      }
      return [ s, r ]
    }

module.exports = times

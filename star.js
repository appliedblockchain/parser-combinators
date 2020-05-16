// @flow strict

const Invalid = require('./invalid')

/*:: import type { Parser as P } from './types/parser' */

const star /*: <A>(P<A>, min?: number) => P<A[]> */ = /*:: <A> */
  (a, min = 0) =>
    input => {
      const r = []
      let s = input
      const eat = _ => ((s = _[0]), r.push(_[1]), true)
      while (true) {
        try {
          eat(a(s))
        } catch (err) {
          if (err instanceof Invalid) {
            break
          }
          throw err
        }
      }
      if (r.length < min) {
        throw new Invalid(input)
      }
      return [ s, r ]
    }

module.exports = star

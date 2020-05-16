// @flow strict

const Invalid = require('./invalid')

/*:: import type { Parser as P } from './types/parser' */

const maybe /*: <A>(P<A>) => P<?A> */ = /*:: <A> */
  (a) =>
    input => {
      try {
        return a(input)
      } catch (err) {
        if (err instanceof Invalid) {
          return [ input, undefined ]
        }
        throw err
      }
    }

module.exports = maybe

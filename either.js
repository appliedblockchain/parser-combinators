// @flow

const Invalid = require('./invalid')

/*:: import type { Parser as P } from './types/parser' */

const either /*: <A, B>(P<A>, P<B>) => P<A | B> */ = /*:: <A, B> */
  (a, b) =>
    input => {
      try {
        return a(input)
      } catch (err) {
        if (err instanceof Invalid) {
          return b(input)
        }
        throw err
      }
    }

module.exports = either

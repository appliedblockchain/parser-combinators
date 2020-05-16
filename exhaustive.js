// @flow strict

const Invalid = require('./invalid')

/*:: import type { Parser as P } from './types/parser' */

const exhaustive /*: <A>(P<A>) => P<A> */ = /*:: <A> */
  (a) =>
    input => {
      const [ s, r ] = a(input)
      if (s !== '') {
        throw new Invalid(input)
      }
      return [ s, r ]
    }

module.exports = exhaustive

// @flow

const Invalid = require('./invalid')

/*:: import type { Parser } from './types/parser' */

const exhaustiveResult /*: <R>(Parser<R>) => (string => R) */ = /*:: <R> */
  (a) =>
    input => {
      const [ s, r ] = a(input)
      if (s !== '') {
        throw new Invalid(`Unparsed ${s}.`)
      }
      return r
    }

module.exports = exhaustiveResult

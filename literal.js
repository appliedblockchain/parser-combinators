// @flow strict

const Invalid = require('./invalid')

/*:: import type { Parser as P } from './types/parser' */

const literal /*: string => P<string> */ =
  expected =>
    input => {
      if (input.startsWith(expected)) {
        return [ input.slice(expected.length), expected ]
      }
      throw new Invalid(input)
    }

module.exports = literal

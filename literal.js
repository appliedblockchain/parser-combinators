// @flow

const Invalid = require('./invalid')

/*:: import type { Parser } from './types/parser' */

const literal = (expected /*: string */) /*: Parser<string> */ =>
  async input => {
    if (input.startsWith(expected)) {
      return [ input.slice(expected.length), expected ]
    }
    throw new Invalid(input)
  }

module.exports = literal

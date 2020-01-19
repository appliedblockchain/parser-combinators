// @flow

const Invalid = require('./invalid')

/*:: import type { Parser } from './types/parser' */

const regex = (re /*: RegExp */) /*: Parser<string[]> */ =>
  async input => {
    if (re.flags.includes('g')) {
      throw new TypeError(`Expected regex without g flag ${String(re)}.`)
    }
    const r = input.match(re)
    if (!r) {
      throw new Invalid(input)
    }
    return [ input.slice(r[0].length), r ]
  }

module.exports = regex

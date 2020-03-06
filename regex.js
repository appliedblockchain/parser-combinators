// @flow

const Invalid = require('./invalid')

/*:: import type { Parser as P } from './types/parser' */

const regex /*: RegExp => P<string[]> */ =
  re =>
    input => {
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

import Invalid from './invalid.js'
import type { Parser as P } from './types/parser.js'

export const regex: (re: RegExp) => P<RegExpMatchArray> =
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

export default regex

import Invalid from './invalid'
import P from './types/parser'

export const literal: (expected: string) => P<string> =
  expected =>
    input => {
      if (input.startsWith(expected)) {
        return [ input.slice(expected.length), expected ]
      }
      throw new Invalid(input)
    }

export default literal

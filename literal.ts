import Invalid from './invalid'
import type P from './types/parser'

export const literal: <T extends string>(expected: T) => P<T> =
  expected =>
    input => {
      if (input.startsWith(expected)) {
        return [ input.slice(expected.length), expected ]
      }
      throw new Invalid(input)
    }

export default literal

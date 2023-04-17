import Invalid from './invalid.js'
import type { Parser as P } from './types/parser.js'

export const maybe: <A>(a: P<A>) => P<void | A> =
  a =>
    input => {
      try {
        return a(input)
      } catch (err) {
        if (err instanceof Invalid) {
          return [ input, undefined ]
        }
        throw err
      }
    }

export default maybe

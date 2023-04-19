import Invalid from './invalid.js'
import type { Parser as P } from './types/parser.js'

export const either: <A, B>(a: P<A>, b: P<B>) => P<A | B> =
  (a, b) =>
    input => {
      try {
        return a(input)
      } catch (err) {
        if (err instanceof Invalid) {
          return b(input)
        }
        throw err
      }
    }

export default either

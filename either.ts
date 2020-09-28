import Invalid from './invalid'
import P from './types/parser'

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

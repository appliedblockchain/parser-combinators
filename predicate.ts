import Invalid from './invalid.js'
import type { Parser as P } from './types/parser.js'

export const predicate: <A>(a: P<A>, f: (_: A) => boolean) => P<A> =
  (a, f) =>
    input => {
      const [ s, r ] = a(input)
      if (!f(r)) {
        throw new Invalid(input)
      }
      return [ s, r ]
    }

export default predicate

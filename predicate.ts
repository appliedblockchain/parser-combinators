import Invalid from './invalid'
import type P from './types/parser'

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

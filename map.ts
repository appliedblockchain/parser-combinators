import type P from './types/parser'

export const map: <A, B>(a: P<A>, f: (_: A) => B) => P<B> =
  (a, f) =>
    input => {
      const [ s, r ] = a(input)
      return [ s, f(r) ]
    }

export default map

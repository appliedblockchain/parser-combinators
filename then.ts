import type P from './types/parser'

export const then =
  <A, B>(a: P<A>, f: (_: A) => P<B>): P<B> =>
    input => {
      const [ s, r ] = a(input)
      return f(r)(s)
    }

export default then

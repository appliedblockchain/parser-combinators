import type P from './types/parser'

export const pair: <A, B>(a: P<A>, b: P<B>) => P<[A, B]> =
  (a, b) =>
    input => {
      const [ sa, ra ] = a(input)
      const [ sb, rb ] = b(sa)
      return [ sb, [ ra, rb ] ]
    }

export default pair

import Invalid from './invalid'
import type P from './types/parser'

export const exhaustive: <A>(a: P<A>) => P<A> =
  a =>
    input => {
      const [ s, r ] = a(input)
      if (s !== '') {
        throw new Invalid(input)
      }
      return [ s, r ]
    }

export default exhaustive

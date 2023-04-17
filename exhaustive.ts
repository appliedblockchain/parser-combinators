import Invalid from './invalid.js'
import type { Parser as P } from './types/parser.js'

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

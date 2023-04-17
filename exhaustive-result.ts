import Invalid from './invalid.js'
import type { Parser as P } from './types/parser.js'

export const exhaustiveResult: <A>(a: P<A>) => (input: string) => A =
  a =>
    input => {
      const [ s, r ] = a(input)
      if (s !== '') {
        throw new Invalid(`Unparsed ${s}.`)
      }
      return r
    }

export default exhaustiveResult

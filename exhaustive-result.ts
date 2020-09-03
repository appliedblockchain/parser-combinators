import Invalid from './invalid'
import P from './types/parser'

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

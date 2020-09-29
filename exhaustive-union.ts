import exhaustive from './exhaustive'
import Invalid from './invalid'
import maybe from './maybe'
import type P from './types/parser'

type ResultOfParser<T extends P<unknown>> = T extends P<infer R> ? R : never

export const exhaustiveUnion =
  <T extends P<unknown>[]>(...as: T): P<ResultOfParser<T[number]>> =>
    (input: string) => {
      for (const a of as) {
        const [ s, r ] = maybe(exhaustive(a))(input)
        if (typeof r !== 'undefined') {
          return [ s, r as any ]
        }
      }
      throw new Invalid(input)
    }

export default exhaustiveUnion

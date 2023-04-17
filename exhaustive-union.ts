import exhaustive from './exhaustive.js'
import Invalid from './invalid.js'
import maybe from './maybe.js'
import type { Parser as P } from './types/parser.js'

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

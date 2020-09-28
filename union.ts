import Invalid from './invalid'
import maybe from './maybe'
import type P from './types/parser'

export const union =
  <T extends P<unknown>[]>(...as: T): T[number] =>
    input => {
      for (const a of as) {
        const [ s, r ] = maybe(a)(input)
        if (typeof r !== 'undefined') {
          return [ s, r ]
        }
      }
      throw new Invalid(input)
    }

export default union

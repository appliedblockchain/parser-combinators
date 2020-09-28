import Invalid from './invalid'
import type P from './types/parser'
import type R from './types/result'

export const star =
  <A>(a: P<A>, min = 0): P<A[]> =>
    input => {
      const r: A[] = []
      let s = input
      const eat = (_: R<A>) => ((s = _[0]), r.push(_[1]), true)
      while (true) {
        try {
          eat(a(s))
        } catch (err) {
          if (err instanceof Invalid) {
            break
          }
          throw err
        }
      }
      if (r.length < min) {
        throw new Invalid(input)
      }
      return [ s, r ]
    }

export default star

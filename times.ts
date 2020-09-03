import type P from './types/parser'
import type Result from './types/result'

export const times =
  <A>(a: P<A>, n: number): P<A[]> =>
    input => {
      const r: A[] = []
      let s = input
      const eat = (_: Result<A>) => ((s = _[0]), r.push(_[1]))
      for (let i = 0; i < n; i++) {
        eat(a(s))
      }
      return [ s, r ]
    }

export default times

import type P from './types/parser'

type ResultOfParser<T> = T extends P<infer R> ? R : never

export const sequence =
  <T extends P<unknown>[]>(...as: T): P<{ [K in keyof T]: ResultOfParser<T[K]> }> =>
    input => {
      const rs = []
      let s = input
      for (const a of as) {
        const r = a(s)
        s = r[0]
        rs.push(r[1])
      }
      return [ s, rs ] as [ string, { [ K in keyof T ]: ResultOfParser<T[ K ]> } ]
    }

export default sequence

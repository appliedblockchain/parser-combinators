import Invalid from './invalid'
import type P from './types/parser'

export const maybe: <A>(a: P<A>) => P<void | A> =
  a =>
    input => {
      try {
        return a(input)
      } catch (err) {
        if (err instanceof Invalid) {
          return [ input, undefined ]
        }
        throw err
      }
    }

export default maybe

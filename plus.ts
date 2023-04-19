import star from './star.js'
import type { Parser as P } from './types/parser.js'

export const plus: <A>(a: P<A>) => P<A[]> =
  a =>
    star(a, 1)

export default plus

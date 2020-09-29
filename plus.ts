import star from './star'
import type P from './types/parser'

export const plus: <A>(a: P<A>) => P<A[]> =
  a =>
    star(a, 1)

export default plus

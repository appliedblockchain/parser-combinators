import map from './map'
import sequence from './sequence'
import star from './star'
import right from './right'
import maybe from './maybe'
import type P from './types/parser'

export const separated: <A>(a: P<A>, s: P<unknown>) => P<A[]> =
  (a, s) =>
    map(sequence(maybe(a), star(right(s, a))), ([ first, rest ]) => (typeof first === 'undefined' ? [] : [ first, ...rest ]))

export default separated

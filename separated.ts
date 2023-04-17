import map from './map.js'
import sequence from './sequence.js'
import star from './star.js'
import right from './right.js'
import maybe from './maybe.js'
import type { Parser as P } from './types/parser.js'

export const separated: <A>(a: P<A>, s: P<unknown>) => P<A[]> =
  (a, s) =>
    map(sequence(maybe(a), star(right(s, a))), ([ first, rest ]) => (typeof first === 'undefined' ? [] : [ first, ...rest ]))

export default separated

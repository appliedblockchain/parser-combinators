import map from './map.js'
import type { Parser as P } from './types/parser.js'
import pair from './pair.js'

export const left: <A, B>(a: P<A>, b: P<B>) => P<A> =
  (a, b) =>
    map(pair(a, b), _ => _[0])

export default left

import pair from './pair.js'
import map from './map.js'
import type { Parser as P } from './types/parser.js'

export const right: <A, B>(a: P<A>, b: P<B>) => P<B> =
  (a, b) =>
    map(pair(a, b), _ => _[1])

export default right

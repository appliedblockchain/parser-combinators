import pair from './pair'
import map from './map'
import type P from './types/parser'

export const right: <A, B>(a: P<A>, b: P<B>) => P<B> =
  (a, b) =>
    map(pair(a, b), _ => _[1])

export default right

import map from './map'
import P from './types/parser'
import pair from './pair'

export const left: <A, B>(a: P<A>, b: P<B>) => P<A> =
  (a, b) =>
    map(pair(a, b), _ => _[0])

export default left

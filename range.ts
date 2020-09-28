import map from './map'
import pair from './pair'
import star from './star'
import times from './times'
import type P from './types/parser'

export const range: <A>(a: P<A>, min: number, max: number) => P<A[]> =
  (a, min, max) =>
    map(pair(times(a, min), star(a, max - min)), _ => [ ..._[0], ..._[1] ])

export default range

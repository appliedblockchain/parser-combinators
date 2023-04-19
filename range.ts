import map from './map.js'
import pair from './pair.js'
import star from './star.js'
import times from './times.js'
import type { Parser as P } from './types/parser.js'

export const range: <A>(a: P<A>, min: number, max: number) => P<A[]> =
  (a, min, max) =>
    map(pair(times(a, min), star(a, max - min)), _ => [ ..._[0], ..._[1] ])

export default range

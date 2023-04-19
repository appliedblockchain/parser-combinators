import decimal from './decimal.js'
import literal from '../literal.js'
import map from '../map.js'
import maybe from '../maybe.js'
import sequence from '../sequence.js'
import type { Parser } from '../types/parser.js'

export const signedDecimal: Parser<number> =
  map(sequence(maybe(literal('-')), decimal), ([ sign, _ ]) => sign ? -_ : _)

export default signedDecimal

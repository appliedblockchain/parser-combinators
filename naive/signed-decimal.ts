import decimal from './decimal'
import literal from '../literal'
import map from '../map'
import maybe from '../maybe'
import sequence from '../sequence'
import type Parser from '../types/parser'

export const signedDecimal: Parser<number> =
  map(sequence(maybe(literal('-')), decimal), ([ sign, _ ]) => sign ? -_ : _)

export default signedDecimal

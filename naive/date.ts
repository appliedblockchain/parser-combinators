import Invalid from '../invalid.js'
import map from '../map.js'
import regex from '../regex.js'
import type { Parser as P } from '../types/parser.js'

export const date: P<Date> =
  input =>
    map(regex(/^\d{4}-\d{2}-\d{2}/), ([ _ ]) => {
      const r = new Date(_)
      if (isNaN(r.getTime())) {
        throw new Invalid(input)
      }
      return r
    })(input)

export default date

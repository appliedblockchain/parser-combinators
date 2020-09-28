import Invalid from '../invalid'
import map from '../map'
import regex from '../regex'
import type P from '../types/parser'

export const dateTime: P<Date> =
  input =>
    map(regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/), ([ _ ]) => {
      const r = new Date(_)
      if (isNaN(r.getTime())) {
        throw new Invalid(input)
      }
      return r
    })(input)

export default dateTime

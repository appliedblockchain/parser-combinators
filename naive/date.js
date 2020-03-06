// @flow

const Invalid = require('../invalid')
const map = require('../map')
const regex = require('../regex')

/*:: import type { Parser } from '../types/parser' */

const date /*: Parser<Date> */ =
  input =>
    map(regex(/^\d{4}-\d{2}-\d{2}/), ([ _ ]) => {
      const r = new Date(_)
      if (isNaN(r)) {
        throw new Invalid(input)
      }
      return r
    })(input)

module.exports = date

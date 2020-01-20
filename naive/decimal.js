// @flow

const Invalid = require('../invalid')

/*:: import type { Parser } from '../types/parser' */

const digits = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' ]

/** Parses unsigned, decimal integer. Assumes it'll fit into js integer. Leading zero is allowed. */
const decimal /*: Parser<number> */ =
  async input => {
    for (let i = 0; i < input.length; i++) {
      if (!digits.includes(input[i])) {
        if (i === 0) {
          throw new Invalid(input)
        }
        return [ input.slice(i), parseInt(input.slice(0, i), 10) ]
      }
    }
    return [ '', parseInt(input, 10) ]
  }

module.exports = decimal

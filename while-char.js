// @flow

const { inspect } = require('util')
const Invalid = require('./invalid')

/*:: import type { Parser } from './types/parser' */

const whileChar /*: (string, min?: number) => Parser<string> */ =
  (chars, min = 0) =>
    input => {
      let i
      for (i = 0; i < input.length; i++) {
        if (!chars.includes(input[i])) {
          break
        }
      }
      if (i < min) {
        throw new Invalid(`Expected ${min} minimum characters passing predicate, character ${inspect(input[i])} didn't pass.`)
      }
      return [ input.slice(i), input.slice(0, i) ]
    }

module.exports = whileChar

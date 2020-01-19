// @flow

/*:: import type { Parser } from './types/Parser' */

const whileChar =
  (f /*: string => boolean */) /*: Parser<string> */ =>
    async input => {
      let i
      for (i = 0; i < input.length; i++) {
        if (!f(input[0])) {
          break
        }
      }
      return [ input.slice(i), input.slice(0, i) ]
    }

module.exports = whileChar

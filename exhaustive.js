// @flow

const Invalid = require('./invalid')

/*:: import type { Parser } from './types/parser' */

const exhaustive =
  /*:: <A> */(a /*: Parser<A> */) /*: Parser<A> */ =>
    async input =>
      a(input).then(([ s, r ]) => {
        if (s !== '') {
          throw new Invalid(input)
        }
        return [ s, r ]
      })

module.exports = exhaustive

// @flow

/*:: import type { Parser } from './types/parser' */

const maybe = /*:: <A> */(a /*: Parser<A> */) /*: Parser<?A> */ =>
  async input => {
    const [ s, r ] = await a(input).catch(() => [ input, void 0 ])
    return [ s, r ]
  }

module.exports = maybe

// @flow

/*:: import type { Parser } from './types/parser' */

const either = /*:: <A, B> */(a /*: Parser<A> */, b /*: Parser<B> */) /*: Parser<A | B> */ =>
  async input => {
    const [ s, r ] = await a(input).catch(() => b(input))
    return [ s, r ]
  }

module.exports = either

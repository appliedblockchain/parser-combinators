// @flow

/*:: import type { Parser } from './types/parser' */

const then = /*:: <A, B> */(a /*: Parser<A> */, f /*: A => Parser<B> */) /*: Parser<B> */ =>
  async input => a(input).then(_ => f(_[1])(_[0]))

module.exports = then

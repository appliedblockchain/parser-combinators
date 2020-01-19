// @flow

/*:: import type { Parser } from './types/parser' */

const map = /*:: <B, A, F: A => B> */(a /*: Parser<A> */, f /*: A => B */) /*: Parser<B> */ =>
  async input =>
    a(input).then(_ => [ _[0], f(_[1]) ])

module.exports = map

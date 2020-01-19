// @flow

/*:: import type { Parser } from './types/parser' */

const pair = /*:: <A, B> */ (a /*: Parser<A> */, b /*: Parser<B> */) /*: Parser<[A, B]> */ =>
  async input =>
    a(input).then(_ => b(_[0]).then(__ => [ __[0], [ _[1], __[1] ] ]))

module.exports = pair

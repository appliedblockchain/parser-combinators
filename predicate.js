// @flow

const Invalid = require('./invalid')

/*:: import type { Parser } from './types/parser' */

const predicate = /*:: <A> */(a /*: Parser<A> */, f /*: A => Promise<boolean> */) /*: Parser<A> */ =>
  async input => {
    const r = await a(input)
    if (!(await f(r[1]))) {
      throw new Invalid(input)
    }
    return r
  }

module.exports = predicate

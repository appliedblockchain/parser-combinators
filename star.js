// @flow

const Invalid = require('./invalid')

/*:: import type { Parser } from './types/parser' */

const star = /*:: <A> */(a /*: Parser<A> */, min /*:: ?: number */ = 0) /*: Parser<A[]> */ =>
  async input => {
    const r = []
    let s = input
    const eat = _ => ((s = _[0]), r.push(_[1]), true)
    while (await a(s).then(eat).catch(() => false)) {}
    if (r.length < min) {
      throw new Invalid(input)
    }
    return [ s, r ]
  }

module.exports = star

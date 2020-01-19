// @flow

/*:: import type { Parser } from './types/parser' */

const times = /*:: <A> */(a /*: Parser<A> */, n /*: number */) /*: Parser<A[]> */ =>
  async input => {
    const r = []
    let s = input
    const eat = _ => ((s = _[0]), r.push(_[1]))
    for (let i = 0; i < n; i++) {
      await a(s).then(eat)
    }
    return [ s, r ]
  }

module.exports = times

// @flow

const map = require('./map')
const pair = require('./pair')
const star = require('./star')
const times = require('./times')

/*:: import type { Parser } from './types/parser' */

const range = /*:: <A> */(a /*: Parser<A> */, min /*: number */, max /*: number*/) /*: Parser<A[]> */ =>
  map(pair(times(a, min), star(a, max - min)), _ => [ ..._[0], ..._[1] ])

module.exports = range

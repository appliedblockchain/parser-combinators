// @flow

const map = require('./map')
const pair = require('./pair')
const star = require('./star')
const times = require('./times')

/*:: import type { Parser as P } from './types/parser' */

const range /*: <A>(P<A>, number, number) => P<A[]> */ = /*:: <A> */
  (a, min, max) =>
    map(pair(times(a, min), star(a, max - min)), _ => [ ..._[0], ..._[1] ])

module.exports = range

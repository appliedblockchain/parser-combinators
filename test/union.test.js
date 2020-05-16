// @flow

const $ = require('../')

const a = $.literal('a')
const b = $.literal('b')

test('union', () => {
  expect($.union(a, b)('a')).toEqual([ '', 'a' ])
  expect($.union(a, b)('b')).toEqual([ '', 'b' ])
  expect(() => $.union(a, b)('c')).toThrowError('c')
})

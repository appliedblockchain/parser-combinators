// @flow

const $ = require('../')

const a = $.literal('a')

test('exhaustive', () => {
  expect($.exhaustive(a)('a')).toEqual([ '', 'a' ])
  expect(() => $.exhaustive(a)('ab')).toThrowError('a')
})

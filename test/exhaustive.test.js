// @flow

const exhaustive = require('../exhaustive')
const literal = require('../literal')

const a = literal('a')

test('exhaustive', () => {
  expect(exhaustive(a)('a')).toEqual([ '', 'a' ])
  expect(() => exhaustive(a)('ab')).toThrowError('a')
})

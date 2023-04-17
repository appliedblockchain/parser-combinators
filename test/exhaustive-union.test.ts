import $ from '../index.js'

const a = $.literal('a')
const b = $.literal('b')

test('union', () => {
  expect($.exhaustiveUnion(a, b)('a')).toEqual([ '', 'a' ])
  expect($.exhaustiveUnion(a, b)('b')).toEqual([ '', 'b' ])
  expect(() => $.exhaustiveUnion(a, b)('c')).toThrowError('c')
  expect(() => $.exhaustiveUnion(a, b)('a ')).toThrowError('a ')
  expect(() => $.exhaustiveUnion(a, b)('b ')).toThrowError('b ')
})

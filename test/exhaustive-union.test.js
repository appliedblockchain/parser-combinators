// @flow

const exhaustiveUnion = require('../exhaustive-union')
const literal = require('../literal')

const a = literal('a')
const b = literal('b')

test('union', async () => {
  await expect(exhaustiveUnion(a, b)('a')).resolves.toEqual([ '', 'a' ])
  await expect(exhaustiveUnion(a, b)('b')).resolves.toEqual([ '', 'b' ])
  await expect(exhaustiveUnion(a, b)('c')).rejects.toThrowError('c')
  await expect(exhaustiveUnion(a, b)('a ')).rejects.toThrowError('a ')
  await expect(exhaustiveUnion(a, b)('b ')).rejects.toThrowError('b ')
})

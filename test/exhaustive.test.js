// @flow

const exhaustive = require('../exhaustive')
const literal = require('../literal')

const a = literal('a')

test('exhaustive', async () => {
  await expect(exhaustive(a)('a')).resolves.toEqual([ '', 'a' ])
  await expect(exhaustive(a)('ab')).rejects.toThrowError('a')
})

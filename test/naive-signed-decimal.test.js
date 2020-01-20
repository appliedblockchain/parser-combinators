// @flow

const signedDecimal = require('../naive/signed-decimal')

test('naive/signed-decimal', async () => {
  await expect(signedDecimal('-012')).resolves.toEqual([ '', -12 ])
  await expect(signedDecimal('123')).resolves.toEqual([ '', 123 ])
  await expect(signedDecimal('-0')).resolves.toEqual([ '', -0 ])
  await expect(signedDecimal('-1')).resolves.toEqual([ '', -1 ])
  await expect(signedDecimal('foo')).rejects.toThrowError('foo')
})
